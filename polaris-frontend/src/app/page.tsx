import Image from "next/image";
import Link from "next/link";

sync function main(){
    const uri = "mongodb+srv://timzou2005:wadd2005@cluster0.gehhk1g.mongodb.net/test?retryWrites=true&w=majority";
    const {MongoClient} = require('mongodb');
    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
    } catch (e) {
        console.error(e);
    }

    const myCollection = client.collection("User");
    const doc = {Name: 'A', 'Password': 'B'};
    //Add Record
    const result = await myCollection.insertOne(doc);
  
}

export default function Home() {
    return (
        <div className="font-saira bg-space-blue w-screen h-screen text-white flex-col-centered">
            <figure className="absolute w-[100vw] h-[75vh] top-0">
                <Image
                    src="/hero/star_bg_mobile.svg"
                    alt="background picture"
                    style={{ objectFit: "cover" }}
                    fill
                    priority
                />
            </figure>

            <figure className="absolute w-[100vw] h-[75vh] bottom-0">
                <Image
                    src="/hero/tree_bg_mobile.svg"
                    alt="background picture"
                    style={{ objectFit: "cover" }}
                    fill
                    priority
                />
            </figure>

            <div className="z-10 flex-col-centered mt-12">
                <h1 className="sm:hidden flex-col-centered text-4xl font-bold tracking-tighter font-saira z-10">
                    <span>Hackathons can be </span>
                    <span className="text-5xl bg-gradient-to-r from-[#fb881c] to-[#6C38FF] inline-block text-transparent bg-clip-text pb-2 font-bold">
                        overwhelming
                    </span>
                </h1>
                <h2 className="sm:hidden flex-col-centered text-2xl font-bold tracking-tighter mt-20">
                    <span className="font-light">Planning your next move </span>
                    <span className="font-semibold">shouldn't be</span>
                </h2>
                <Link href="./events"
                className="bg-button-orange rounded-lg w-72 h-12 text-black font-saira text-xl tracking-tighter font-medium mt-36">
                    See what hackers are up to -{'>'}
                </Link>

            </div>
        </div>
    );
}
