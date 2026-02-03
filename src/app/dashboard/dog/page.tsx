import Link from "next/link"

type BreedType = {
    id: string;
    type: string;
    attributes: {
        name: string;
        description: string;
        life: {
            max: number;
            min: number;
        }
        male_weight: {
            max: number;
            min: number;
        }
        female_weight: {
            max: number;
            min: number
        }
        hypoallergenic: boolean;
    }
    relationships: {
        groups: {
            data: {
                id: string;
                type: string;
            }
        }
    }
}
const DogApiCard = ((breed: BreedType) => {
    const href = `/dashboard/dog/${breed.id}`
    return (
        <div key={breed.id} className="bg-white rounded-xl p-6 md:p-8 border border-gray-300  hover:shadow-lg transition-shadow" >
            <h2 className="flex text-black text-xl border-b-0"><strong>{breed.attributes.name}</strong></h2>

            <div className="text-black text-lg">
                Lifespan: {breed.attributes.life.min} - {breed.attributes.life.max} years
            </div>
            <div className="flex flex-col text-lg text-black">
                Weight:
                <span>Male: {breed.attributes.male_weight.min} - {breed.attributes.male_weight.max} years</span>
                <span>Female: {breed.attributes.female_weight.min} - {breed.attributes.female_weight.max} years</span>
            </div>

            <p className="text-black text-sm line-clamp-3">
                {breed.attributes.description}
            </p>

            <div className="text-black mb-2">
                <strong>Hypoallergenic:</strong> {breed.attributes.hypoallergenic ? "✅ Yes" : "❌ No"}
            </div>
            <Link href={`/dashboard/dog/${breed.id}`}><button className="mx-auto border text-xl bg-amber-300 text-black hover:cursor-pointer">Click for details</button></Link>
        </div>
    )
}
)


export default async function DogBreedsPage() {
    const response = await fetch('https://dogapi.dog/api/v2/breeds?page%5Bnumber%5D=1&page%5Bsize%5D=12')

    const json = await response.json();
    const breeds: BreedType[] = json.data;
    //   console.log(breeds)


    return (
        <main className="flex flex-col m-4 min-h-screen bg-slate-100">
            <h1 className="flex mx-auto font-bold text-center text-black text-6xl mb-8">Dog Breeds</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                {breeds.map((breed, idx) => (
                    <DogApiCard key={idx} {...breed} />
                ))}
            </div>
        </main>
    );
}