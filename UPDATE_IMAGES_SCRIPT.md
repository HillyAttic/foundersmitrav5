# Image Update Summary

## Issue Identified
Multiple services are using the same images, particularly:
- `imgi_19_risk-management-concept-illustration` is used for 6+ services
- `imgi_13_stock-market-concept-illustration` is used for 3+ services  
- `imgi_17_business-registration` is used for 2+ services
- `imgi_21_flat-design-illustration-customer-support` is used for 2+ services

## Solution
I've created a mapping guide (IMAGE_MAPPING_GUIDE.md) that shows which unique image from your local folder should be used for each service.

## What You Need to Do

### Option 1: Manual Update (Recommended for Accuracy)
Open `services.html` and search for each service heading, then update its image path according to this mapping:

1. **Investment Consultancy** (Service #6)
   - Change FROM: `imgi_19_risk-management...jpg`
   - Change TO: `imgi_16_investment-data-concept-illustration_114360-5159.jpg`

2. **Section 80-IAC Tax Exemption** (Service #8)
   - Change FROM: `imgi_13_stock-market...jpg`
   - Change TO: `imgi_18_tax-concept-illustration_114360-1057.jpg`

3. **Location Strategy for Brand Expansion** (Service #10)
   - Change FROM: `imgi_19_risk-management...jpg`
   - Change TO: `imgi_20_store-location-abstract-concept...jpg`

4. **Virtual CFO Services** (Service #11)
   - Change FROM: `imgi_19_risk-management...jpg`
   - Change TO: `imgi_22_business-analysis-concept-illustration_114360-5518.jpg`

5. **GAP Analysis Services** (Service #12)
   - Change FROM: `imgi_17_business-registration...jpg`
   - Change TO: `imgi_22_business-analysis-concept-illustration_114360-5518.jpg`
   - OR: `imgi_10_people-analyzing-growth-charts_23-2148866843.jpg`

6. **Business Performance Report** (Service #13)
   - Change FROM: `imgi_13_stock-market...jpg`
   - Change TO: `imgi_23_data-report-illustration-concept_114360-883.jpg`

7. **Brand Building** (Service #14)
   - Change FROM: `imgi_21_flat-design...jpg`
   - Change TO: `imgi_24_branding-concept-illustration_114360-8911.jpg`

8. **Secretarial Compliances** (Service #15)
   - Change FROM: `imgi_19_risk-management...jpg`
   - Change TO: `imgi_25_online-document-concept-illustration_114360-5589.jpg`

9. **Business Compliance Suite** (Service #16)
   - Change FROM: `imgi_19_risk-management...jpg`
   - Change TO: `imgi_18_tax-concept-illustration_114360-1057.jpg`
   - OR: `imgi_25_online-document-concept-illustration_114360-5589.jpg`

### Option 2: Download Additional Unique Images from Web
If you want completely unique images for ALL services, you can:

1. Visit Freepik.com or Vecteezy.com
2. Search for the specific service (e.g., "virtual CFO illustration", "GAP analysis illustration")
3. Download free vector illustrations
4. Save them to `D:\foundersmitra\images\services\`
5. Update the HTML file with the new image paths

### Recommended Web Sources:
- **Freepik.com** - Free vectors (requires attribution or premium account)
- **Vecteezy.com** - Free vectors
- **Undraw.co** - Free illustrations (no attribution required)
- **Flaticon.com** - Free icons and illustrations

### Search Terms for Missing Services:
- "virtual CFO services illustration vector"
- "location strategy business expansion illustration"
- "GAP analysis business illustration"
- "business performance dashboard illustration"
- "secretarial compliance document illustration"
- "brand building illustration vector"
- "business compliance suite illustration"

## Current Status
✅ Services 1-5 have correct unique images
✅ Service 7 (Company Setup) has correct image
✅ Service 9 (Business Risk Management) has correct image
⚠️ Services 6, 8, 10-16 need unique images assigned

## Next Steps
1. Review the IMAGE_MAPPING_GUIDE.md file
2. Either manually update the HTML file OR download new images from web
3. Test the page at http://127.0.0.1:8788/services to verify all images display correctly
4. Ensure each service has a visually distinct and relevant illustration

## Backup
A backup of your current services.html has been created at:
`d:\foundersmitra\services.html.backup`

You can restore it anytime if needed.
