package com.heritage.platform.service;

import com.heritage.platform.common.BadRequestException;
import com.heritage.platform.dto.response.UploadResponse;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class UploadService {

    @Value("${app.upload-dir:uploads}")
    private String uploadDir;

    private final AuthContextService authContextService;

    public UploadService(AuthContextService authContextService) {
        this.authContextService = authContextService;
    }

    @PostConstruct
    public void init() throws IOException {
        Files.createDirectories(Path.of(uploadDir));
    }

    public UploadResponse uploadImage(MultipartFile file) {
        authContextService.requireContributor();
        return storeImage(file);
    }

    public UploadResponse uploadProfileAvatar(MultipartFile file) {
        authContextService.requireActiveUser();
        return storeImage(file);
    }

    private UploadResponse storeImage(MultipartFile file) {
        if (file.isEmpty()) {
            throw new BadRequestException("Uploaded file cannot be empty.");
        }
        if (file.getContentType() == null || !file.getContentType().startsWith("image/")) {
            throw new BadRequestException("Only image files can be uploaded.");
        }

        String extension = extractExtension(file.getOriginalFilename());
        String generatedName = UUID.randomUUID() + extension;
        Path target = Path.of(uploadDir).resolve(generatedName);

        try {
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ex) {
            throw new BadRequestException("Image could not be saved: " + ex.getMessage());
        }

        return new UploadResponse(generatedName, "/uploads/" + generatedName);
    }

    private String extractExtension(String originalFilename) {
        if (originalFilename == null || !originalFilename.contains(".")) {
            return ".jpg";
        }
        return originalFilename.substring(originalFilename.lastIndexOf('.'));
    }
}
