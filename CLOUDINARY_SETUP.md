# Cloudinary Setup Instructions

## Getting Started with Cloudinary

1. **Create a Cloudinary Account**
   - Go to https://cloudinary.com/
   - Sign up for a free account
   - You'll get 25GB storage and 25GB bandwidth per month

2. **Get Your Credentials**
   - After logging in, go to your Dashboard
   - You'll see your account details:
     - Cloud Name
     - API Key
     - API Secret

3. **Add to Environment Variables**
   
   Add these three lines to your `.env` file in the server folder:
   
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name_here
   CLOUDINARY_API_KEY=your_api_key_here
   CLOUDINARY_API_SECRET=your_api_secret_here
   ```

4. **Example .env File**
   ```
   PORT=4000
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIPDROP_API=your_clipdrop_api_key
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_SECRET=your_razorpay_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

## Features Enabled

With Cloudinary integration, your app now has:

- ✅ **Persistent Image Storage**: All generated images are saved to cloud
- ✅ **Image Gallery**: Users can view all their generated images
- ✅ **Favorites System**: Mark images as favorites
- ✅ **Bulk Delete**: Delete multiple images at once
- ✅ **Image Metadata**: Store prompts, creation dates, and user info
- ✅ **Organized Storage**: Images organized by folder in Cloudinary
- ✅ **CDN Delivery**: Fast image loading from Cloudinary's CDN

## Testing

1. Start the server: `npm run dev`
2. Generate an image from the Result page
3. Visit the Gallery page (🖼️ button in navbar)
4. Try favoriting, viewing, and deleting images

## Folder Structure in Cloudinary

Images are stored in: `imagify_generations/`

Each image is named: `{userId}_{timestamp}`
