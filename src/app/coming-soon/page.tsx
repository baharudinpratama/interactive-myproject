import Image from "next/image";

export default function Page() {
  return (
    <div className="w-screen h-screen bg-yellow" style={{ backgroundImage: "url('/bg-waves.png')", backgroundSize: "cover" }}>
      <Image src="/coming-soon.png" alt="coming-soon" fill={true} style={{ objectFit: "contain" }} />
    </div>
  );
}
