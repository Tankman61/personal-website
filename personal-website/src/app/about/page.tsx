export default function About() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen px-4">
            <h1 className="text-4xl text-airbus-blue mb-4">A350 FMS - About</h1>
            <section className="max-w-xl bg-black bg-opacity-70 rounded-lg p-6 shadow-lg">
                <p className="mb-4 text-airbus-yellow">
                    This website is inspired by the Airbus A350 Flight Management System (FMS).
                </p>
                <ul className="list-disc list-inside mb-4 text-airbus-magenta">
                    <li>Modern navigation and interface design</li>
                    <li>Focus on clarity and efficiency</li>
                    <li>Custom color palette based on Airbus avionics</li>
                </ul>
                <p className="text-airbus-green">
                    Explore the site to experience a digital homage to the advanced avionics of the A350!
                </p>
            </section>
        </main>
    );
}