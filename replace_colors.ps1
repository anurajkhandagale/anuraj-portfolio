# Replace silver with warm gold/champagne palette
$files = Get-ChildItem "d:\resume\src\components\*.tsx"
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw
    # Primary accent: silver -> warm gold
    $content = $content -replace '#c0c0c0', '#d4a574'
    $content = $content -replace '#C0C0C0', '#d4a574'
    # Mid gray accents -> dark bronze
    $content = $content -replace '#8a8a8a', '#8a7355'
    # Light gray -> champagne
    $content = $content -replace 'rgba\(192, 192, 192', 'rgba(212, 165, 116'
    $content = $content -replace 'rgba\(192,192,192', 'rgba(212,165,116'
    # Neutral-400 tailwind classes -> amber-400/stone-400 for warmth
    $content = $content -replace 'text-neutral-400', 'text-amber-300/80'
    $content = $content -replace 'border-neutral-400', 'border-amber-300/80'
    $content = $content -replace 'bg-neutral-400', 'bg-amber-300/80'
    # Zinc-400 -> stone-400 for warmth
    $content = $content -replace 'text-zinc-400', 'text-stone-400'
    $content = $content -replace 'border-zinc-400', 'border-stone-400'
    $content = $content -replace 'bg-zinc-400', 'bg-stone-400'
    Set-Content $f.FullName -Value $content -NoNewline
}

# Also update page.tsx
$appFiles = @("d:\resume\src\app\page.tsx")
foreach ($f in $appFiles) {
    if (Test-Path $f) {
        $content = Get-Content $f -Raw
        $content = $content -replace '#c0c0c0', '#d4a574'
        $content = $content -replace '#C0C0C0', '#d4a574'
        Set-Content $f -Value $content -NoNewline
    }
}

Write-Output "Gold/champagne palette applied."
