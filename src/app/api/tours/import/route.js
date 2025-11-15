import { NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/mongodb';
import Tour from '../../../../../models/Tour';

const toursData = [
  {
    "title": "Nine Arch Bridge",
    "city": "Ella",
    "address": "Ella, Badulla District",
    "distance": 205,
    "photo": "/images/Nine Arch Bridge.png",
    "desc": "The Nine Arches Bridge in Ella is a colonial-era railway bridge built entirely of stone and brick, nestled between lush hills. It's a popular photo spot, especially when a train passes over it. The bridge is an engineering marvel and a serene place for nature lovers.",
    "shortDesc": "Historic railway bridge in lush greenery.",
    "price": "12",
    "maxGroupSize": 20,
    "featured": false,
    "avgRating": 4.6
  },
  {
    "title": "Temple of the Tooth",
    "city": "Kandy",
    "address": "Sri Dalada Veediya, Kandy",
    "distance": 115,
    "photo": "/images/kandy.jpg",
    "desc": "The Temple of the Tooth Relic is one of the most sacred Buddhist temples in the world. Located in the royal palace complex of Kandy, it houses the relic of the tooth of the Buddha. The temple is a center of devotion and a key cultural site in Sri Lanka.",
    "shortDesc": "Sacred temple housing Buddha's tooth relic.",
    "price": "8",
    "maxGroupSize": 30,
    "featured": false,
    "avgRating": 4.2
  },
  {
    "title": "Galle Fort",
    "city": "Galle",
    "address": "Galle, Southern Province",
    "distance": 120,
    "photo": "/images/galle.jpg",
    "desc": "Galle Fort is a UNESCO World Heritage Site that showcases colonial Dutch architecture, cobbled streets, museums, cafes, and ramparts facing the ocean. Built in the 16th century, it is a blend of European and South Asian architectural styles and a living heritage city.",
    "shortDesc": "Historic seaside fort with colonial charm.",
    "price": "10",
    "maxGroupSize": 50,
    "featured": false,
    "avgRating": 4.7
  },
  {
    "title": "Nuwara Eliya Tea Plantations",
    "city": "Nuwara Eliya",
    "address": "Nuwara Eliya, Central Province",
    "distance": 160,
    "photo": "/images/nuwaraeliya.jpeg",
    "desc": "Nuwara Eliya, known as 'Little England', is a hill station surrounded by lush tea plantations, colonial-era buildings, and cool mountain air. It's a serene escape perfect for scenic train rides, visiting tea factories, and relaxing by Gregory Lake.",
    "shortDesc": "Colonial town with scenic tea estates.",
    "price": "15",
    "maxGroupSize": 15,
    "featured": false,
    "avgRating": 4.6
  },
  {
    "title": "Yala National Park",
    "city": "Yala",
    "address": "Yala, Southern Province",
    "distance": 290,
    "photo": "/images/yala.jpg",
    "desc": "Yala National Park is Sri Lanka's most visited wildlife sanctuary, known for its high density of leopards, elephants, crocodiles, and diverse birdlife. Safari tours through its grasslands and lagoons offer exciting close encounters with nature.",
    "shortDesc": "Wildlife safaris with leopards and elephants.",
    "price": "25",
    "maxGroupSize": 6,
    "featured": false,
    "avgRating": 4.5
  },
  {
    "title": "Anuradhapura Sacred City",
    "city": "Anuradhapura",
    "address": "Anuradhapura, North Central Province",
    "distance": 205,
    "photo": "/images/anuradhapura.jpg",
    "desc": "Anuradhapura is one of the ancient capitals of Sri Lanka, famous for its well-preserved ruins of a Sinhalese civilization. The sacred city includes stupas, monasteries, and the ancient Bodhi tree, considered the oldest living tree with a known planting date.",
    "shortDesc": "Ancient city with sacred Buddhist sites.",
    "price": "15",
    "maxGroupSize": 35,
    "featured": false,
    "avgRating": 4.5
  },
  {
    "title": "Trincomalee Beach",
    "city": "Trincomalee",
    "address": "Trincomalee, Eastern Province",
    "distance": 250,
    "photo": "/images/trincomalee.jpg",
    "desc": "Trincomalee is a coastal town with pristine beaches, coral reefs, and historical landmarks. Its Nilaveli and Uppuveli beaches are popular for snorkeling and whale watching. The ancient Koneswaram Temple overlooks the ocean from a cliff.",
    "shortDesc": "Coastal town with clear waters and snorkeling.",
    "price": "10",
    "maxGroupSize": 25,
    "featured": false,
    "avgRating": 4.3
  },
  {
    "title": "Polonnaruwa Ruins",
    "city": "Polonnaruwa",
    "address": "Polonnaruwa, North Central Province",
    "distance": 216,
    "photo": "/images/polonnaruwa.avif",
    "desc": "Polonnaruwa was the second capital of Sri Lanka after the destruction of Anuradhapura. It features well-preserved temples, statues, and reservoirs from the 11th to 13th centuries, making it a rich archaeological park and a UNESCO site.",
    "shortDesc": "Historic ruins of a medieval capital.",
    "price": "12",
    "maxGroupSize": 30,
    "featured": false,
    "avgRating": 4.6
  },
  {
    "title": "Horton Plains National Park",
    "city": "Nuwara Eliya",
    "address": "Ohiya, Central Highlands",
    "distance": 180,
    "photo": "/images/hortan.jpg",
    "desc": "Horton Plains is a protected plateau in Sri Lanka's central highlands, famous for its biodiversity, cloud forests, and the dramatic escarpment known as World's End. It's a haven for hikers and nature lovers.",
    "shortDesc": "Highland park with scenic hikes and wildlife.",
    "price": "20",
    "maxGroupSize": 10,
    "featured": false,
    "avgRating": 4.7
  },
  {
    "title": "Arugam Bay",
    "city": "Arugam Bay",
    "address": "Ampara District, Eastern Province",
    "distance": 320,
    "photo": "/images/aru.avif",
    "desc": "Arugam Bay is a world-famous surfing destination on Sri Lanka's east coast. Beyond its waves, the bay offers beachside cafes, yoga retreats, and access to nearby wildlife and cultural sites.",
    "shortDesc": "Famous surf beach with chilled vibes.",
    "price": "8",
    "maxGroupSize": 15,
    "featured": false,
    "avgRating": 4.4
  },
  {
    "title": "Dambulla Cave Temple",
    "city": "Dambulla",
    "address": "Dambulla, Matale District",
    "distance": 148,
    "photo": "/images/dabulla.jpg",
    "desc": "The Dambulla Cave Temple, also known as the Golden Temple of Dambulla, is a vast cave monastery filled with ancient Buddhist murals and over 150 Buddha statues. It dates back to the 1st century BCE and remains a living place of worship. The temple sits atop a rock offering panoramic views.",
    "shortDesc": "Rock temple complex filled with Buddha statues.",
    "price": "10",
    "maxGroupSize": 20,
    "featured": false,
    "avgRating": 4.5
  },
  {
    "title": "Ravana Falls",
    "city": "Ella",
    "address": "Ella, Badulla District",
    "distance": 210,
    "photo": "/images/ravana.jpg",
    "desc": "Ravana Falls is one of Sri Lanka's most dramatic waterfalls, cascading from a height of 25 meters. Legend has it that King Ravana of the Ramayana hid Princess Sita in the nearby caves. It's a popular stop for travelers in Ella.",
    "shortDesc": "Legendary waterfall near Ella town.",
    "price": "9",
    "maxGroupSize": 20,
    "featured": false,
    "avgRating": 4.3
  },
  {
    "title": "Jaffna City",
    "city": "Jaffna",
    "address": "Jaffna, Northern Province",
    "distance": 400,
    "photo": "/images/jafna.jpg",
    "desc": "Jaffna is the cultural capital of the Tamil people in Sri Lanka. It offers colonial forts, Hindu temples, quiet beaches, and a unique cuisine. Despite its war-torn past, the city is rebuilding and welcoming more visitors each year.",
    "shortDesc": "Northern city rich in Tamil culture.",
    "price": "12",
    "maxGroupSize": 30,
    "featured": false,
    "avgRating": 4.4
  }
];

export async function POST(request) {
  try {
    await dbConnect();
    console.log('Importing tours...');
    
    // Clear existing tours (optional - remove this line if you want to keep existing tours)
    // await Tour.deleteMany({});
    
    // Insert all tours
    const result = await Tour.insertMany(toursData, { ordered: false });
    
    console.log(`Successfully imported ${result.length} tours`);
    
    return NextResponse.json({
      success: true,
      message: `Successfully imported ${result.length} tours`,
      count: result.length
    }, { status: 201 });
  } catch (error) {
    console.error('Error importing tours:', error);
    
    // Handle duplicate key errors (tours already exist)
    if (error.code === 11000 || error.name === 'BulkWriteError') {
      return NextResponse.json({
        success: false,
        error: 'Some tours already exist. Duplicates were skipped.',
        details: error.message
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to import tours'
    }, { status: 500 });
  }
}

