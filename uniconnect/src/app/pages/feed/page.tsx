import NavigationBar from "@/lib/components/NavigationBar";

export default function Feed() {
    return(
        <div className="p-3 bg-gray-200 shadow-xl min-h-screen">
            <div className="bg-white rounded-lg">
                <NavigationBar/>
            </div>
            <h1>Feed</h1>
        </div>
    )
}