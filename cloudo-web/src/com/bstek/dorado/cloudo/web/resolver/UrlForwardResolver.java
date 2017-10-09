package com.bstek.dorado.cloudo.web.resolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

public class UrlForwardResolver implements Controller {

	private String forwardTo;

	public void setForwardTo(String forwardTo) {
		this.forwardTo = forwardTo;
	}

	public ModelAndView handleRequest(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		request.getRequestDispatcher(forwardTo).forward(request, response);
		return null;
	}

}