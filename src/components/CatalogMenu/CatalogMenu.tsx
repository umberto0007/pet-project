import {ActiveProps} from '#entities/activeProps';


const CatalogMenu = ({active, setActive, children}: ActiveProps) => {
    return (
        <div
            className={`${active
                ?
                'active [&.active]: opacity-100 pointer-events: all'
                :
                'opacity-0 pointer-events-none'} h-screen w-screen  fixed flex items-center justify-center transition-[0.5s] left-0 top-0`}
            onClick={() => setActive(false)}>
            <div
                className='fixed w-full bg-[white] transition-[0.4s] duration-[all] shadow-[0_6px_4px_-4px_rgba(0,0,0,0.2)] left-0 top-[63px]'
                onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
};

export default CatalogMenu;