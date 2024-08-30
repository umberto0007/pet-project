import BrandsList from './BrandsPart/BrandsList';


const Brands = () => {
    return (
        <section className='mt-24'>
            <h2 className='text-2xl'>Популярные бренды</h2>
            <div className='flex gap-4 flex-wrap mt-14'>
                <BrandsList amount={14}/>
            </div>
        </section>
    );
};

export default Brands;