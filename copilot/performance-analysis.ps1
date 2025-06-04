# CSS Performance Comparison Script
# Compares file sizes and theoretical load performance

param(
    [string]$ProjectPath = "e:\Projects\oliviastudio"
)

Write-Host "=== CSS Modularization Performance Analysis ===" -ForegroundColor Green
Write-Host ""

# Get file sizes
$monolithicSize = (Get-Item "$ProjectPath\style.css").Length
$modularMainSize = (Get-Item "$ProjectPath\style-new.css").Length

# Get all modular files
$modularFiles = Get-ChildItem "$ProjectPath\styles\*.css"
$totalModularSize = ($modularFiles | Measure-Object -Property Length -Sum).Sum + $modularMainSize

Write-Host "File Size Comparison:" -ForegroundColor Yellow
Write-Host "  Monolithic (style.css): $([math]::Round($monolithicSize/1KB, 2)) KB"
Write-Host "  Modular Main (style-new.css): $([math]::Round($modularMainSize/1KB, 2)) KB"
Write-Host "  Modular Total: $([math]::Round($totalModularSize/1KB, 2)) KB"
Write-Host ""

Write-Host "Individual Module Sizes:" -ForegroundColor Yellow
foreach ($file in $modularFiles | Sort-Object Name) {
    $size = [math]::Round($file.Length/1KB, 2)
    Write-Host "  $($file.Name): $size KB"
}
Write-Host ""

# Calculate overhead
$overhead = $totalModularSize - $monolithicSize
$overheadPercent = [math]::Round(($overhead / $monolithicSize) * 100, 1)
Write-Host "Overhead Analysis:" -ForegroundColor Yellow
Write-Host "  Size difference: $([math]::Round($overhead/1KB, 2)) KB"
Write-Host "  Percentage increase: $overheadPercent%"
Write-Host ""

# Line count comparison
$monolithicLines = (Get-Content "$ProjectPath\style.css").Count
$modularLines = 0
foreach ($file in $modularFiles) {
    $modularLines += (Get-Content $file.FullName).Count
}

Write-Host "Line Count Comparison:" -ForegroundColor Yellow
Write-Host "  Monolithic: $monolithicLines lines"
Write-Host "  Modular Total: $modularLines lines"
Write-Host "  Documentation added: $($modularLines - $monolithicLines) lines"
Write-Host ""

# HTTP Request Analysis
Write-Host "Network Request Analysis:" -ForegroundColor Yellow
Write-Host "  Monolithic: 1 HTTP request"
Write-Host "  Modular: $($modularFiles.Count + 1) HTTP requests (CSS @import)"
Write-Host "  Note: @import requests are sequential, not parallel"
Write-Host ""

# Benefits Analysis
Write-Host "Modularization Benefits:" -ForegroundColor Green
Write-Host "  ✓ Improved maintainability"
Write-Host "  ✓ Better code organization"
Write-Host "  ✓ Easier debugging"
Write-Host "  ✓ Selective loading potential"
Write-Host "  ✓ Team collaboration friendly"
Write-Host "  ✓ Clear separation of concerns"
Write-Host ""

Write-Host "Potential Optimizations:" -ForegroundColor Cyan
Write-Host "  • Use CSS bundler for production"
Write-Host "  • Implement HTTP/2 server push"
Write-Host "  • Consider critical CSS inlining"
Write-Host "  • Add compression (gzip/brotli)"
Write-Host ""

Write-Host "=== Analysis Complete ===" -ForegroundColor Green
