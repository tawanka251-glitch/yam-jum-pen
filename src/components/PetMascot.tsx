export function PetMascot({ className = '' }: { className?: string }) {
    return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* หู */}
            <circle cx="55" cy="55" r="28" fill="#FFB98A" />
            <circle cx="145" cy="55" r="28" fill="#FFB98A" />
            {/* หัว/ตัวกลมอ้วน */}
            <circle cx="100" cy="115" r="75" fill="#FFCFA3" />
            {/* แก้มปุ๊กสีชมพู */}
            <circle cx="55" cy="130" r="14" fill="#FFB3A7" opacity="0.7" />
            <circle cx="145" cy="130" r="14" fill="#FFB3A7" opacity="0.7" />
            {/* ตา */}
            <circle cx="75" cy="105" r="7" fill="#5C4433" />
            <circle cx="125" cy="105" r="7" fill="#5C4433" />
            {/* จมูก */}
            <ellipse cx="100" cy="130" rx="10" ry="7" fill="#5C4433" />
        </svg>
    );
}