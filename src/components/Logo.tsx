import Image from "next/image";

interface LogoProps {
   src: string;
   alt: string;
   width?: number;
   height?: number;
}

export default function Logo({
   src,
   alt,
   width = 100,
   height = 100,
}: LogoProps) {
   return <Image src={src} alt={alt} width={width} height={height} />;
}
