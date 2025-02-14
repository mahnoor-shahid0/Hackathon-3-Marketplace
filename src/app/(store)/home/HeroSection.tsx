import Image from "next/image";
import heroImage from "../../../../public/home-image.png";

const HeroSection = () => {
   return (
     <div className="m-auto lg:h-[750px] lg:w-[1000px] sm:w-full sm:h-auto">
       <Image
         className="rounded-br-[40px]"
         src={heroImage}
         alt="Hero Image"
         width={1321}
         height={850}
       />
     </div>
   );
 };
 
 export default HeroSection;
 