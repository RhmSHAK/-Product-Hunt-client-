

const Banner = () => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/s5KQpm4/software.jpg)' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-lg">
                    <h1 className="mb-5 text-5xl font-bold">Welcome to Product Hunt!</h1>
                    <p className="mb-5  font-medium  text-2xl">  Platform is users can discover and share their tech products. Tech
                        Products means Web Apps, AI tools, Softwares, Games, Mobile Apps </p>
                    {/* <button className="btn btn-primary">Get Started</button> */}
                </div>
            </div>
        </div>
        
    );
};

export default Banner;