import Button from "@/app/components/Button/Button";

export default function Home() {
    return (
        <main className="pt-24">
            <section className="bg-gray-100 w-full py-32 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12">Encontre o espaço ideal para o seu momento</h1>
                <Button className="px-10 py-3 text-lg">Buscar agora</Button>
            </section>

            <div className="max-w-[1200px] mx-auto px-4 space-y-20 py-16">
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">Destaques de espaços</h2>
                        <Button>Ver todos</Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <article key={i} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                                <div className="w-full h-40 bg-gray-200 rounded mb-4" />
                                <h3 className="font-medium text-lg text-gray-700">Espaço {i + 1}</h3>
                                <p className="text-gray-500 text-sm">Descrição breve do espaço...</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="text-center">
                    <h2 className="text-4xl font-semibold text-gray-800 mb-8">Para proprietários</h2>
                    <h3 className="text-xl font-medium text-gray-700 mb-4">Tem um espaço disponível?</h3>
                    <p className="text-gray-500 mb-6">Ganhe dinheiro alugando seu espaço comercial com praticidade!</p>
                    <Button className="px-6 py-3 text-lg">Comece a anunciar</Button>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Como funciona</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                        {[...Array(4)].map((_, i) => (
                            <details key={i} className="bg-white border rounded-md p-4 cursor-pointer">
                                <summary className="font-medium text-gray-700">Etapa {i + 1}: Nome da etapa</summary>
                                <p className="text-gray-500 mt-2">Explicação da etapa {i + 1}, com detalhes importantes.</p>
                            </details>
                        ))}
                    </div>
                </section>

                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">Avaliações</h2>
                        <Button>Ver todas</Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <article key={i} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3" />
                                    <div>
                                        <p className="font-medium text-gray-700">Usuário {i + 1}</p>
                                        <p className="text-sm text-gray-500">⭐⭐⭐⭐☆</p>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm">“Comentário sobre o espaço alugado...”</p>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
