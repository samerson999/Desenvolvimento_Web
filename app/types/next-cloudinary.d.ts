import "next-cloudinary";

declare module "next-cloudinary" {
  export interface CloudinaryUploadWidgetOptions {
    /**
     * Optional. Moderation string for Cloudinary AI moderation add-ons.
     * E.g., "aws_rek" for AWS Rekognition AI moderation.
     */
    moderation?: string;
  }
}