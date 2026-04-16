package com.heritage.platform.controller;

import com.heritage.platform.common.ApiResponse;
import com.heritage.platform.dto.response.AdminContributorApplicationResponse;
import com.heritage.platform.enums.ContributorApplicationStatus;
import com.heritage.platform.service.ContributorApplicationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/contributor-applications")
public class AdminContributorApplicationController {

    private final ContributorApplicationService contributorApplicationService;

    public AdminContributorApplicationController(ContributorApplicationService contributorApplicationService) {
        this.contributorApplicationService = contributorApplicationService;
    }

    @GetMapping
    public ApiResponse<List<AdminContributorApplicationResponse>> listApplications(
            @RequestParam(required = false) ContributorApplicationStatus status
    ) {
        return ApiResponse.success(contributorApplicationService.listAdminApplications(status));
    }

    @PostMapping("/{applicationId}/approve")
    public ApiResponse<AdminContributorApplicationResponse> approve(@PathVariable Long applicationId) {
        return ApiResponse.success("贡献者申请已通过", contributorApplicationService.approve(applicationId));
    }

    @PostMapping("/{applicationId}/reject")
    public ApiResponse<AdminContributorApplicationResponse> reject(@PathVariable Long applicationId) {
        return ApiResponse.success("贡献者申请已驳回", contributorApplicationService.reject(applicationId));
    }
}
