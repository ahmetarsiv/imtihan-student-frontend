export default function createImageUrl(path: string): string {
    return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${path}`;
}
