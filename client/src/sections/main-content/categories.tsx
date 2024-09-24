import { Stack } from "@mui/material";

const items = [
    {
        image: '/car-rentals_banner.png',
        href: '#'
    },
    {
        image: '/hotels_banner.png',
        href: '#'
    },
    {
        image: '/travel_banner.png',
        href: '#'
    },
] as { image: string, href: string }[]

export function Categories() {
    return (
        <Stack
            sx={{
                width:  { xs: '100%', md: '200px' },
                minHeight:  { xs: 'auto', md: '100vh' },
                gap: { xs: 1, md: 4 },
                display :'flex',
                flexDirection : { xs: 'row', md: 'column' },
            }}
        >
            {
                items.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        style={{
                            display: 'block',
                            width: '100%',
                            height: '180px',
                            backgroundImage: `url(${item.image})`,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            borderRadius: '10px',
                        }}
                    />
                ))
            }
        </Stack>
    )
}