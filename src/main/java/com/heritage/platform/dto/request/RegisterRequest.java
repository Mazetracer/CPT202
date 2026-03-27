package com.heritage.platform.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "用户名不能为空")
        @Size(min = 4, max = 50, message = "用户名长度需要在4到50之间")
        String username,

        @NotBlank(message = "密码不能为空")
        @Size(min = 6, max = 30, message = "密码长度需要在6到30之间")
        String password,

        @NotBlank(message = "昵称不能为空")
        @Size(max = 50, message = "昵称不能超过50个字符")
        String nickname
) {
}
