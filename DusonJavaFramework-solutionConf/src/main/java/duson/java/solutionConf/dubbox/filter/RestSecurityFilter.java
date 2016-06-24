package duson.java.solutionConf.dubbox.filter;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import org.apache.http.NameValuePair;
import org.apache.http.client.utils.URLEncodedUtils;
import org.springframework.http.MediaType;

public class RestSecurityFilter implements ContainerRequestFilter {
	@Context
    HttpServletRequest request;
    @Context
    private HttpServletResponse response;
    
	@Override
	public void filter(ContainerRequestContext cxt) throws IOException {
		Map params = new HashMap();
		
		if(cxt.getMethod().toUpperCase().equals("POST")) {
			InputStream input = cxt.getEntityStream();
			BufferedReader reader = new BufferedReader(new InputStreamReader(input));
			StringBuilder sb = new StringBuilder();
			String tmp = "";
			while((tmp = reader.readLine()) != null) {
				sb.append(tmp);
			}
			String cnt = sb.toString();

			List<NameValuePair> paramList = URLEncodedUtils.parse(cnt, Charset.forName("UTF-8"));
			for(NameValuePair param : paramList)
				params.put(param.getName(), param.getValue());
		} else {
			Enumeration<String> paramNames = request.getParameterNames();
			String key = null;
			while(paramNames.hasMoreElements()) {
				key = paramNames.nextElement();
				params.put(key, request.getParameter(key));
			}
		}
		
		Object result = new Object();
		
		Object timestampObj = params.get("timestamp"); // 请求有效期，秒，unix时间戳
		if(timestampObj == null) {
			//result.setErrorMsg("时间戳不能为空");
			//errorResponse(cxt, result);
			//return;
		}
		// 偏差大于600秒则会被拒绝
		long timestamp = Long.valueOf(timestampObj.toString());
		long curTimestamp = System.currentTimeMillis() / 1000;
		if(curTimestamp - timestamp > 600) {
			//result.setErrorMsg("请求已过期");
			//errorResponse(cxt, result);
			//return;			
		}
		
		Object remoteSign = params.get("sign");
		if(remoteSign == null) {
			//result.setErrorMsg("签名不能为空");
			errorResponse(cxt, result);
			return;
		}
		
		String method = request.getMethod();
		String url = request.getScheme() + "://" + request.getServerName() + ":" + request.getRequestURI();
		String localSign = SecurityUtils.generateSign("", method, url, params);
		if(remoteSign != null && !remoteSign.toString().equals(localSign)) {
			//result.setErrorMsg("签名校验失败");
			errorResponse(cxt, result);
			return;
		}
	}
	
	private void errorResponse(ContainerRequestContext cxt, Object result) {
		cxt.abortWith(Response.status(500).type(MediaType.APPLICATION_JSON_UTF8_VALUE).entity(result).build());
	}
	
}
