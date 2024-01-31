export const Section = ({ title, children }) => {
    return (
        <section>
            <div className='headingBar d-md-flex my-3 p-2'>
                <h1>{title}</h1>
            </div>

            {children}
        </section>
    );
};
