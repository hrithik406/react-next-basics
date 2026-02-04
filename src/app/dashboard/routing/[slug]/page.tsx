export default async function DynamicIdRouting({ params }: { params: Promise<{ slug: string }>}) {
    const {slug} =await params
    let lang = ["python","java","javascript","cpp","cs"]
    if(lang.includes(slug)){
        return (
            <div className="text-black text-4xl font-bold">My Post: {slug}</div>
        )
    }
    else{
        return(
            <div className="text-black text-4xl font-bold">Post Not Found</div>
        )
    }
}

