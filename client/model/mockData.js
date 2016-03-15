const Data = {
     users: [
        {
     allergies: [
          {
              id_user: 1,
              allergen: 'pollen',
              current: true
            },
            {
              id_user: 1,
              allergen: 'cats',
              current: false
            },
          ],
    eyerx: [
        {
          id_user: 1,
          sphere_right: 2.45,
          sphere_left: 1.75,
          cylinder_right: 4.23,
          cylinder_left: -1.2,
          axis_right: 40,
          axis_left: 83,
          add_right: -3.4,
          add_left: 3.4,
          current: true
        },
    ],
  family: [
            {
            id_user: 1,
            name: 'Mom'
          },
          {
            id_user: 1,
            name: 'Dad'
          },
          {
            id_user: 1,
            name: 'Grandma (maternal)'
          },
  ],


insurance: [
        {
          id_user: 1,
            plan_name: 'Anthem',
            group_id: '93dgaio4t',
            plan_id: 'f4j894',
            rx_bin: '843r9',
            current: true
        },
          {
            id_user: 1,
              plan_name: 'Cigna',
              group_id: '4wj49v',
              plan_id: 'jf983',
              rx_bin: '3q2r89',
              current: false
          },
    ],

      pharmacy: [
        {
          id_user: 1,
          business_name: 'CVS',
          address: '123 Health Cove',
          phone: '111-111-1111',
          current: true
        },
    ],

      user_doctor: [
          {
            id_user: 1,
            id_doctor: 1,
            type_usermade: 'Psychologist',
            current: true
          },
      ],
  familyhistory: [
          {
            id_familymember: 1,
            condition: 'Cancer'
          },
          {
            id_familymember: 2,
            condition: 'Super Cancer'
          },
          {
            id_familymember: 3,
            condition: 'Breast Cancer'
          },
          {
            id_familymember: 3,
            condition: 'Diabetes'
          },
          {
            id_familymember: 4,
            condition: 'Bad Disease'
          },
          {
            id_familymember: 5,
            condition: 'Superbug'
          },
          {
            id_familymember: 6,
            condition: 'Lupus'
          },
          {
            id_familymember: 6,
            condition: 'Nvm it\'s never lupus'
          },
  ],

  rx: [
        {
          id_user: 1,
          id_pharmacy: 1,
          id_doctor: 1,
          refill_number: 39483,
          name: 'Chill Pillz',
          dosage: '1 pill every 2 hours',
          current: false
        },
    ],

        },


        // {
        //   username: 'Hamburguesa',
        //   password: 'mycoolpassword',
        //   email: 'amberleyjohanna@gmail.com',
        //     phone: '123-456-7899'
        // }
     ],

     Doctor: [
        {   
            id_doctor: 1,
            name: 'Donald Drumpffff',
            street_address: '123 Regular American Dr.',
            city: 'New York City',
            state_abbrev: 'NY',
            zip: 10001,
            email: 'ilduce@hotmail.com',
            web: 'votedrumpf2016.com',
            phone: '555555555',
            type: 'Psychologist',
            glyph: 'cloud'
          },
          {
            id_doctor: 2,
            name: 'Hillary Clinton',
            street_address: '123 Wall Street',
            city: 'New York City',
            state_abbrev: 'NY',
            zip: 10001,
            email: 'leaked@yahoo.gov',
            web: 'feminist-guilt-trip.gov',
            phone: '1111111111',
            type: 'Optometrist',
            glyph: 'eye-open'
          },
        {
             id_doctor: 3,
             name: 'Arnold Schwarzenegger',
             street_address: '123 Alpha Street',
             city: 'New York City',
             state_abbrev: 'NY',
             zip: 10001,
             email: 'leaked@yahoo.gov',
             web: 'feminist-guilt-trip.gov',
             phone: 7777777777,
             type: 'Urologist',
             created_at: null,
             updated_at: null,
             glyph: 'user'
        },
        {
             id_doctor: 4,
             name: 'Oz',
             street_address: '123 TV Street',
             city: 'New York City',
             state_abbrev: 'NY',
             zip: 10001,
             email: 'leaked@yahoo.gov',
             web: 'feminist-guilt-trip.gov',
             phone: 7777777777,
             type: 'Doctor',
             created_at: null,
             updated_at: null,
             glyph: 'heart'
        }
    ],

//     allergies: [
//       {
//           id_user: 1,
//           allergen: 'pollen',
//           current: true
//         },
//         {
//           id_user: 1,
//           allergen: 'cats',
//           current: false
//         },
//         {
//           id_user: 2,
//           allergen: 'cats',
//           current: true
//         },
//         {
//           id_user: 2,
//           allergen: 'rabbits',
//           current: true
//         },
//     ],
// eyerx: [
//     {
//           id_user: 1,
//           sphere_right: 2.45,
//           sphere_left: 1.75,
//           cylinder_right: 4.23,
//           cylinder_left: -1.2,
//           axis_right: 40,
//           axis_left: 83,
//           add_right: -3.4,
//           add_left: 3.4,
//           current: true
//         },
//         {
//           id_user: 2,
//           sphere_right: 2.0,
//           sphere_left: -4.53,
//           cylinder_right: 2.34,
//           cylinder_left: 5.6,
//           axis_right: 90,
//           axis_left: 10,
//           add_right: 3.45,
//           add_left: -1.3,
//           current: true
//         },
//         {
//           id_user: 2,
//           sphere_right: 12.4,
//           sphere_left: -10.2,
//           cylinder_right: 2.34,
//           cylinder_left: 5.6,
//           axis_right: 90,
//           axis_left: 3,
//           add_right: 3.45,
//           add_left: -1.3,
//           current: false
//         }
//   ],

//   family: [
//             {
//             id_user: 1,
//             name: 'Mom'
//           },
//           {
//             id_user: 1,
//             name: 'Dad'
//           },
//           {
//             id_user: 1,
//             name: 'Grandma (maternal)'
//           },
//           {
//             id_user: 2,
//             name: 'Dad'
//           },
//           {
//             id_user: 2,
//             name: 'Mom'
//           },
//           {
//             id_user: 2,
//             name: 'Aunt'
//           },
//           {
//             id_user: 2,
//             name: 'Grandpa (dad\'s dad)'
//           },
//   ],

// insurance: [
//         {
//           id_user: 1,
//             plan_name: 'Anthem',
//             group_id: '93dgaio4t',
//             plan_id: 'f4j894',
//             rx_bin: '843r9',
//             current: true
//         },
//           {
//             id_user: 1,
//               plan_name: 'Cigna',
//               group_id: '4wj49v',
//               plan_id: 'jf983',
//               rx_bin: '3q2r89',
//               current: false
//           },
//           {
//             id_user: 2,
//               plan_name: 'Aetna',
//               group_id: '4fj90',
//               plan_id: 'qf939',
//               rx_bin: 'kq09',
//               current: true
//           }
//     ],

//   pharmacy: [
//         {
//           id_user: 1,
//           business_name: 'CVS',
//           address: '123 Health Cove',
//           phone: '111-111-1111',
//           current: true
//         },
//         {
//           id_user: 2,
//           business_name: 'Walgreens',
//           address: '45 Prescription Street',
//           phone: '111-111-1111',
//           current: true
//         },
//         {
//           id_user: 2,
//           business_name: 'Walgreens',
//           address: '45 Other Walgreens Street',
//           phone: '111-111-1111',
//           current: false
//         },
//   ],

//   user_doctor: [
//           {
//             id_user: 1,
//             id_doctor: 1,
//             type_usermade: 'Psychologist',
//             current: true
//           },
//           {
//             id_user: 2,
//             id_doctor: 2,
//             type_usermade: 'Baby Doc',
//             current: true
//           }
//   ],

//   familyhistory: [
//           {
//             id_familymember: 1,
//             condition: 'Cancer'
//           },
//           {
//             id_familymember: 2,
//             condition: 'Super Cancer'
//           },
//           {
//             id_familymember: 3,
//             condition: 'Breast Cancer'
//           },
//           {
//             id_familymember: 3,
//             condition: 'Diabetes'
//           },
//           {
//             id_familymember: 4,
//             condition: 'Bad Disease'
//           },
//           {
//             id_familymember: 5,
//             condition: 'Superbug'
//           },
//           {
//             id_familymember: 6,
//             condition: 'Lupus'
//           },
//           {
//             id_familymember: 6,
//             condition: 'Nvm it\'s never lupus'
//           },
//   ],

//   rx: [
//         {
//           id_user: 1,
//           id_pharmacy: 1,
//           id_doctor: 1,
//           refill_number: 39483,
//           name: 'Chill Pillz',
//           dosage: '1 pill every 2 hours',
//           current: false
//         },
//         {
//           id_user: 2,
//           id_pharmacy: 2,
//           id_doctor: 2,
//           refill_number: 8978,
//           name: 'Medicine',
//           dosage: '1 per day',
//           current: true
//         }
//   ]



  };



  module.exports = Data;