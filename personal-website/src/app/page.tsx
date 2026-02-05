import HomeComponent from "@/components/HomeComponent";
import { getNumberOfPosts } from "../../lib/posts";

export default function Home() {
    const numPosts = getNumberOfPosts();

    return (
        <HomeComponent blogCount={numPosts} />
    )
}