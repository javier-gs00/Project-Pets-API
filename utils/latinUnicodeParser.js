// module.exports = function(str) {
//     return str
//     .replace(/&#x2013;/gi, ' ')
//     .replace(/&#xa0;/gi, ' ')
//     .replace(/&#xc4;/gi, 'Á')
//     .replace(/&#xe1;/gi, 'á')
//     .replace(/&#xc9;/gi, 'É')
//     .replace(/&#xe9;/gi, 'é')
//     .replace(/&#xcd;/gi, 'Í')
//     .replace(/&#xed;/gi, 'í')
//     .replace(/&#xd3;/gi, 'Ó')
//     .replace(/&#xF3;/gi, 'ó')
//     .replace(/&#xda;/gi, 'Ú')
//     .replace(/&#xfa;/gi, 'ú')
//     .replace(/&#xdc;/gi, 'Ü')
//     .replace(/&#xfc;/gi, 'ü')
//     .replace(/&#xd1;/gi, 'Ñ')
//     .replace(/&#xf1;/gi, 'ñ')
// }


// remove accents and symbols
module.exports = function(str) {
    return str
    .replace(/&#x2013;/gi, ' ')
    .replace(/&#xa0;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&#x2018;/gi, "'")
    .replace(/&#x2019;/gi, "'")
    .replace(/&#xC1;/gi, 'A')
    .replace(/&#xc4;/gi, 'A') 
    .replace(/&#xe1;/gi, 'a')
    .replace(/&#xc9;/gi, 'E')
    .replace(/&#xcb;/gi, 'E')
    .replace(/&#xe9;/gi, 'e')
    .replace(/&#xcd;/gi, 'I')
    .replace(/&#xed;/gi, 'i')
    .replace(/&#xd3;/gi, 'O')
    .replace(/&#xF3;/gi, 'o')
    .replace(/&#xda;/gi, 'U')
    .replace(/&#xfa;/gi, 'u')
    .replace(/&#xdc;/gi, 'U')
    .replace(/&#xfc;/gi, 'u')
    .replace(/&#xd1;/gi, 'N')
    .replace(/&#xf1;/gi, 'n')
}