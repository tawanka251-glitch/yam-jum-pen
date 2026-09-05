export interface Pet {
    id: string;
    name: string;
    type: string;          // สุนัข / แมว
    breed: string;         // สายพันธุ์
    age: string;           // อายุ
    behavior: string;      // นิสัย
    medicalNotes: string;  // ข้อควรระวัง / โรคประจำตัว
    ownerName: string;     // ชื่อผู้ฝาก
}

// Mock Data สำหรับทดสอบระบบ
const mockPets: Pet[] = [
    {
        id: '1',
        name: 'ส้มจี๊ด',
        type: 'แมว',
        breed: 'สก็อตติช โฟลด์',
        age: '2 ปี',
        behavior: 'เข้ากับคนง่าย ชอบนอน ไม่ข่วนเฟอร์นิเจอร์',
        medicalNotes: 'แพ้อาหารที่มีส่วนผสมของไก่',
        ownerName: 'คุณกันทรากร'
    },
    {
        id: '2',
        name: 'โบ้',
        type: 'สุนัข',
        breed: 'โกลเด้น รีทริฟเวอร์',
        age: '1 ปี 6 เดือน',
        behavior: 'พลังเยอะ ชอบวิ่งเล่น ต้องการการพาเดินวันละ 2 รอบ',
        medicalNotes: 'ไม่มีโรคประจำตัว ทานยาถ่ายพยาธิแล้ว',
        ownerName: 'คุณสิรภพ'
    }
];

export function getAllPets(): Pet[] {
    return mockPets;
}