import Btn from "./btn";



export default async function DynamicIdRouting({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    console.log(id)
    let response = await fetch(`https://dogapi.dog/api/v2/breeds/${id}`)
    // const json = await response.json();
    // const breed = json.data;
    // console.log({breed})
    console.log(response)
    console.log(response.status)
    if (response.status != 200) return (
        <div>
            <div className="text-black text-4xl font-bold">Post Not Found</div>
            {/* <Btn/> */}
        </div>
    )
    const json = await response.json()
    const breed = json.data
    console.log(json)
    console.log(breed.id)

    type detailsType = {
        img: string;
        title: string;
        value: string;
    }

    const details: detailsType[] = [
        {
            img: '/lifespan.png',
            title: "Life-Span",
            value: `${breed.attributes.life.max} - ${breed.attributes.life.min}`
        },
        {
            img: '/male.png',
            title: "Male Weight",
            value: `${breed.attributes.male_weight.max} - ${breed.attributes.male_weight.min}`
        },
        {
            img: '/female.png',
            title: "Female Weight",
            value: `${breed.attributes.female_weight.max} - ${breed.attributes.female_weight.min}`
        },
        {
            img: '/hypoallergenic.png',
            title: "Hypoallergenic",
            value: `${breed.attributes.hypoallergenic ? "Yes" : "No"}`
        }
    ];


    const DetailsCard = (core: detailsType) => (
        <div className="flex bg-white rounded-xl py-3 px-4 md:px-6 md:py-4 border border-gray-200  hover:shadow-lg transition-all hover:scale-105 duration-200 gap-x-2"
        >
            <div className="px-3"><img className="w-6" src={core.img} alt="" /></div>
            <h3 className="text-lg md:text-xl font-bold text-black">
                {core.title} :
            </h3>
            <p className="px-3 text-xl font-bold text-gray-600">
                {core.value}
            </p>
        </div>
    )

    return (
        <main className="flex flex-col min-h-screen m-6 text-xl text-black">
            <div className="grid grid-cols-3 gap-8 md:gap-12">
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-center text-4xl font-bold">{breed.attributes.name}</div>
                    <div className="py-8">{breed.attributes.description}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-col-6 gap-4">
                        {details.map((core, i) => (
                            <DetailsCard key={i} {...core} />
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-linear-to-br from-yellow-400 via-orange-400 to-pink-500 rounded-xl min-h-[400px] md:min-h-full lg:min-h-full flex items-center justify-center relative overflow-hidden">
                        {/* Image Placeholder - Replace with actual image */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-32 h-32 md:w-48 md:h-48 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
                                    <span className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white">IMG</span>
                                </div>
                                <p className="text-white text-lg md:text-xl font-semibold">Profile Image Space</p>
                            </div>
                        </div>
                        {/* You can replace the above div with: */}
                        {/* <img src="your-image-url.jpg" alt="Profile" className="w-full h-full object-cover" /> */}
                    </div>
                </div>
            </div>
        </main>
    )
}

// if error occurs then return error component
// if not then 

