# Company Logos

Place your company logos here.

## File Format
- **Format:** PNG or SVG
- **Size:** Recommended 200x200px or larger
- **Background:** Transparent preferred

## Example Structure
```
logos/
├── trellix.png
├── intel.png
├── google.png
└── microsoft.png
```

## How to Add Logos

1. **Download** company logos (transparent PNG preferred)
2. **Save** them in this folder
3. **Reference** in `data/experiences.json`:

```json
{
  "company": "Company Name",
  "logo": "/assets/logos/company-name.png",
  ...
}
```

## Tips
- Use official brand assets when possible
- Maintain consistent sizing
- Transparent backgrounds work best with dark/light mode
- SVG format is ideal for scalability

## Missing Logos?
If a logo is missing, the component will gracefully hide the logo section and only show the company name.
