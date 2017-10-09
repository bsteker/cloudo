package com.bstek.dorado.cloudo.workbench.interceptor;

import javax.servlet.http.HttpServletRequest;

import com.bstek.dorado.cloudo.ace.AceEditor;
import com.bstek.dorado.cloudo.workbench.IDEContext;
import com.bstek.dorado.core.Configure;
import com.bstek.dorado.view.View;
import com.bstek.dorado.web.DoradoContext;

public class SourceEditorInterceptor {
    private String getTheme() {
        String theme = Configure.getString("cloudo.sourceEditor.theme",
            "cloudo");
        return theme;
    }

    public void onView(View view, AceEditor sourceEditor) throws Exception {
        HttpServletRequest request = DoradoContext.getCurrent().getRequest();
        // 设定主题
        sourceEditor.setTheme(this.getTheme());

        String path = (String) request.getParameter("path");
        String mode = (String) request.getParameter("mode");

        //设定语言和路径
        sourceEditor.setUserData(path);
        sourceEditor.setMode(mode);

        //初始化值
        sourceEditor.setValue(IDEContext.getFileExplorer().readFile(path));

    }
}
