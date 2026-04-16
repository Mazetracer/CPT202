package com.heritage.platform.controller;

import com.heritage.platform.common.ApiResponse;
import com.heritage.platform.dto.response.MyContributorApplicationResponse;
import com.heritage.platform.service.ContributorApplicationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/my/contributor-applications")
public class MyContributorApplicationController {

    private final ContributorApplicationService contributorApplicationService;

    public MyContributorApplicationController(ContributorApplicationService contributorApplicationService) {
        this.contributorApplicationService = contributorApplicationService;
    }

    @GetMapping
    public ApiResponse<List<MyContributorApplicationResponse>> listMyApplications() {
        return ApiResponse.success(contributorApplicationService.listMyApplications());
    }

    @PostMapping
    public ApiResponse<MyContributorApplicationResponse> createApplication() {
        return ApiResponse.success("贡献者申请提交成功", contributorApplicationService.createApplication());
    }
}
