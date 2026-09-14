import type { Service } from '@/lib/api-client-react';

export const CATEGORY_BRANDING = 'Kwagura Ikirango (Branding)';
export const CATEGORY_PRINT = 'Gucapa n\'Ibyapa';
export const CATEGORY_PHOTO = 'Amafoto n\'Amashusho';
export const CATEGORY_DIGITAL = 'Digital (Urubuga n\'Iby\'ikoranabuhanga)';

// Kinyarwanda names, descriptions, and categories for the 36 services.
// Keyed by display order, which matches the seeded database order.
const servicesRw: Record<number, { name: string; description: string; category: string }> = {
  1: { name: 'Igishushanyo cy\'ikirango', description: 'Ikirango cy\'umwihariko abantu bakumbura.', category: CATEGORY_BRANDING },
  2: { name: 'Amakarita y\'ubucuruzi (Business cards)', description: 'Amakarita yo mu rwego rwo hejuru atanga isura nziza ku nshuro ya mbere.', category: CATEGORY_BRANDING },
  3: { name: 'Uturango tw\'ibicuruzwa (Tags)', description: 'Uturango tw\'ibicuruzwa tugaragara neza nka kinyamuga.', category: CATEGORY_BRANDING },
  4: { name: 'Ibyapa by\'imyenda', description: 'Ibyapa byacapwe biramba ku myenda yawe.', category: CATEGORY_BRANDING },
  5: { name: 'Impapuro zifatira (Stickers)', description: 'Impapuro zifatira zagenewe gupakiraho, kwamamaza, n\'ibindi.', category: CATEGORY_BRANDING },
  6: { name: 'Ibirango by\'ibimyetso (Badges)', description: 'Ibirango by\'ibiterane, amakarita ndangamuntu, n\'ibirango by\'amazina.', category: CATEGORY_BRANDING },
  7: { name: 'Ibyerekanwa bifatika (Mockups)', description: 'Ibyerekanwa bisa n\'ukuri bituma ubona uko igishushanyo cyawe kizagara aho ari ho hose.', category: CATEGORY_BRANDING },
  8: { name: 'Kwandika ku makaramu', description: 'Amakaramu n\'iboreshwa mu kwandika biriho ikirango cy\'ubucuruzi bwawe.', category: CATEGORY_BRANDING },
  9: { name: 'Gucapa ku mipira', description: 'Gucapa mu buryo buzwi nka Screen na Digital ku mipira y\'ubunini bwose.', category: CATEGORY_PRINT },
  10: { name: 'Ibyapa by\'ibirango bya 3D', description: 'Inyuguti n\'ibyapa bya 3D bikora ku maso by\'amaduka n\'ibiro.', category: CATEGORY_PRINT },
  11: { name: 'Ibyapa byirundiza (Roll up banners)', description: 'Ibyapa bitwara ku buryo bworoshye bifungurwa mu masagonda.', category: CATEGORY_PRINT },
  12: { name: 'Ibyapa binini byo ku muhanda (Billboards)', description: 'Ibyapa binini cyane bihagarika abagenda ku muhanda.', category: CATEGORY_PRINT },
  13: { name: 'Impamyabushobozi', description: 'Impamyabushobozi n\'ibihembo byashushanyijwe kandi bikacapwa.', category: CATEGORY_PRINT },
  14: { name: 'Imbibi z\'ifovu (Foam boards)', description: 'Imbibi z\'ifovu zitarereye cyane zagenewe kwerekana ibintu no mu murikagurisha.', category: CATEGORY_PRINT },
  15: { name: 'Sitagisi zihuse (Express stamps)', description: 'Sitagisi z\'irangi zitagereranywa, zitangwa vuba.', category: CATEGORY_PRINT },
  16: { name: 'Kwandika ku modoka', description: 'Ibishushanyo biri ku bitwara abantu bijyanye no kwamamaza ikirango cyawe mu muhanda.', category: CATEGORY_PRINT },
  17: { name: 'Gutsinda ibiro', description: 'Shushanya inkuta z\'ibiro, inzugi, n\'aho kwakirira abakiriya.', category: CATEGORY_PRINT },
  18: { name: 'Ibyapa byo ku mukuta (Posters)', description: 'Ibyapa byo ku mukuta byo mu rwego rwo hejuru mu bunini bwose.', category: CATEGORY_PRINT },
  19: { name: 'Impapuro zo kwamamaza (Flyers)', description: 'Impapuro zikiranwa zikabonwa no gusangizwa abandi.', category: CATEGORY_PRINT },
  20: { name: 'Ibitabo byo kwamamaza (Brochure)', description: 'Ibitabo bitunganyijwe mu buryo bwa kinyamuga n\'amadosiye.', category: CATEGORY_PRINT },
  21: { name: 'Guteranya ibitabo', description: 'Gutunga no gukomeza ibitabo n\'amaporaporogaramu biramba.', category: CATEGORY_PRINT },
  22: { name: 'Amakepu', description: 'Amakepu afite ibirango byoshye n\'ibyo kwamamaza.', category: CATEGORY_PRINT },
  23: { name: 'Igikombe cya cyayi (Mugs)', description: 'Isahani n\'ibikombe bifite ibirango byihariye byo gutanga nka impano n\'ibiro.', category: CATEGORY_PRINT },
  24: { name: 'Ibitabo by\'ibicuruzwa (Catalogues)', description: 'Ibitabo by\'ibicuruzwa bigurisha ibyo ufite byose.', category: CATEGORY_PRINT },
  25: { name: 'Mutaka', description: 'Mutaka ziriho ikirango zagenewe kuramba.', category: CATEGORY_PRINT },
  26: { name: 'Imfuka z\'impano (Gift bags)', description: 'Imfuka nshya z\'impano n\'ibipfunyika.', category: CATEGORY_PRINT },
  27: { name: 'Amakarita yo kwohereza (Post cards)', description: 'Amakarita y\'ubukangurambaga, ubutumire, n\'indamukanyo.', category: CATEGORY_PRINT },
  28: { name: 'Imyenda yo nyuma mu biterane (Backdrops)', description: 'Imyenda yo nyuma yacapwe y\'ibiterane n\'inzu z\'amafoto.', category: CATEGORY_PRINT },
  29: { name: 'Gushushanya ku mukuta', description: 'Igishushanyo gikorwa n\'intoki ku mukuta w\'inzu yawe.', category: CATEGORY_PRINT },
  30: { name: 'Gucapa ku muhanda', description: 'Ibimenyetso biramba ku muhanda n\'ibyapa byacapwe.', category: CATEGORY_PRINT },
  31: { name: 'Ibirango ku mabuye n\'amabati (Tiles)', description: 'Ibirango ku mabuye n\'amabati y\'imihanda n\'inyubako.', category: CATEGORY_PRINT },
  32: { name: 'Igikombe n\'Ibihembo', description: 'Igikombe, ibyapa by\'icyubahiro, n\'ibihembo bishushanyije.', category: CATEGORY_PRINT },
  33: { name: 'Impapuro z\'uputumwa bugufi (Memos)', description: 'Impapuro zacapwe z\'uputumwa mu biro n\'iboreshwa mu biro.', category: CATEGORY_PRINT },
  34: { name: 'Gufata amafoto n\'amashusho', description: 'Gufata amafoto n\'amashusho y\'ibicuruzwa, ibiterane, n\'ibirango.', category: CATEGORY_PHOTO },
  35: { name: 'Gushyira amafoto mu giti n\'ibibaho', description: 'Gushyira amafoto mu giti cyangwa mu bibaho biranga.', category: CATEGORY_PHOTO },
  36: { name: 'Igishushanyo mbonera cy\'urubuga', description: 'Imbuga za interinete zivuba, zisobanutse, zikora ku cyuma icyo ari cyo cyose.', category: CATEGORY_DIGITAL },
};

export function translateServices(services: Service[]): Service[] {
  return services.map((service) => {
    const rw = servicesRw[service.displayOrder] ?? servicesRw[service.id];
    return rw ? { ...service, name: rw.name, description: rw.description, category: rw.category } : service;
  });
}