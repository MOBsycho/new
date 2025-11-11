import Loading from "@/app/loading";
import Link from "next/link";

export default function TestLoadingPage() {
  return (
    <div className="min-h-screen">
      <div className="p-8">
        <h1 className="text-4xl text-center mb-8 text-deep-brown">Testing Loading Component</h1>
        <p className="text-center text-incense mb-8">
          The loading component should display when navigating to pages.
        </p>
        
        {/* Display the loading component for preview */}
        <div className="border-2 border-sandalwood/20 rounded-lg p-4 mb-8">
          <h2 className="text-2xl text-center mb-4 text-deep-brown">Loading Component Preview:</h2>
          <div className="relative h-[400px]">
            <Loading />
          </div>
        </div>
        
        <div className="text-center">
          <Link href="/" className="text-sandalwood hover:text-deep-brown underline">
            Go to Homepage (Test Loading on Navigation)
          </Link>
        </div>
      </div>
    </div>
  );
}
