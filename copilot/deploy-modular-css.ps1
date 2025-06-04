# CSS Modular System Deployment Script
# Switches all HTML files from style.css to style-new.css

param(
    [switch]$Deploy,
    [switch]$Rollback,
    [string]$ProjectPath = "e:\Projects\oliviastudio"
)

function Show-Help {
    Write-Host "CSS Modular System Deployment Script" -ForegroundColor Green
    Write-Host ""
    Write-Host "Usage:"
    Write-Host "  .\deploy-modular-css.ps1 -Deploy    # Switch to modular CSS system"
    Write-Host "  .\deploy-modular-css.ps1 -Rollback  # Revert to monolithic CSS system"
    Write-Host ""
    Write-Host "Files that will be updated:"
    $htmlFiles = Get-ChildItem "$ProjectPath\*.html" -Exclude "test-*.html"
    foreach ($file in $htmlFiles) {
        Write-Host "  $($file.Name)"
    }
}

function Deploy-ModularCSS {
    Write-Host "Deploying Modular CSS System..." -ForegroundColor Yellow
    Write-Host ""
    
    $htmlFiles = Get-ChildItem "$ProjectPath\*.html" -Exclude "test-*.html"
    $updatedCount = 0
    
    foreach ($file in $htmlFiles) {
        $content = Get-Content $file.FullName -Raw
        
        if ($content -match 'href="style\.css"') {
            $newContent = $content -replace 'href="style\.css"', 'href="style-new.css"'
            $newContent = $newContent -replace '<!-- Button Components -->', '<!-- Modular CSS System -->'
            
            Set-Content -Path $file.FullName -Value $newContent -NoNewline
            Write-Host "✓ Updated: $($file.Name)" -ForegroundColor Green
            $updatedCount++
        } else {
            Write-Host "- Skipped: $($file.Name) (no style.css reference found)" -ForegroundColor Gray
        }
    }
    
    Write-Host ""
    Write-Host "Deployment Complete!" -ForegroundColor Green
    Write-Host "Updated $updatedCount HTML files to use modular CSS system"
    Write-Host ""
    Write-Host "Next Steps:"
    Write-Host "1. Test website functionality thoroughly"
    Write-Host "2. Check browser console for any CSS loading errors"
    Write-Host "3. Validate responsive design on different devices"
    Write-Host "4. Monitor page load performance"
}

function Rollback-ModularCSS {
    Write-Host "Rolling back to Monolithic CSS System..." -ForegroundColor Yellow
    Write-Host ""
    
    $htmlFiles = Get-ChildItem "$ProjectPath\*.html" -Exclude "test-*.html"
    $updatedCount = 0
    
    foreach ($file in $htmlFiles) {
        $content = Get-Content $file.FullName -Raw
        
        if ($content -match 'href="style-new\.css"') {
            $newContent = $content -replace 'href="style-new\.css"', 'href="style.css"'
            $newContent = $newContent -replace '<!-- Modular CSS System -->', '<!-- Button Components -->'
            
            Set-Content -Path $file.FullName -Value $newContent -NoNewline
            Write-Host "✓ Reverted: $($file.Name)" -ForegroundColor Green
            $updatedCount++
        } else {
            Write-Host "- Skipped: $($file.Name) (no style-new.css reference found)" -ForegroundColor Gray
        }
    }
    
    Write-Host ""
    Write-Host "Rollback Complete!" -ForegroundColor Green
    Write-Host "Reverted $updatedCount HTML files to use monolithic CSS system"
}

# Main execution
if (-not $Deploy -and -not $Rollback) {
    Show-Help
    exit
}

if ($Deploy -and $Rollback) {
    Write-Host "Error: Cannot specify both -Deploy and -Rollback" -ForegroundColor Red
    exit 1
}

if ($Deploy) {
    Deploy-ModularCSS
} elseif ($Rollback) {
    Rollback-ModularCSS
}
