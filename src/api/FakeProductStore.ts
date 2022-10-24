import { DetailedProduct, Product, ProductStore } from '../Products/ProductStore'

export class FakeProductStore implements ProductStore {
  constructor(
    private readonly fakeDelayInMs = 250,
    private readonly products = productStubs
  ) {}

  inCategory(categoryId: string): Promise<ReadonlyArray<Product>> {
    return new Promise(
      resolve => setTimeout(() => resolve(this.products[categoryId] ?? []), this.fakeDelayInMs)
    )
  }

  bySku(sku: string): Promise<DetailedProduct | undefined> {
    return new Promise(
      resolve => setTimeout(() => resolve(
        Object.values(this.products).flat().find(p => p.sku === sku)
      ), this.fakeDelayInMs / 2)
    )
  }
}

const productStubs: Record<string, ReadonlyArray<DetailedProduct>> = {
  'mens-outerwear': [{
    sku: '10-15068',
    title: 'Men\'s Tech Shell Full-Zip',
    description: 'A versatile full-zip that you can wear all day long and even to the gym. This technical shell features moisture-wicking fabric, added stretch and a hidden pocket for your smartphone or media player.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% polyester.&lt;/li&gt;&lt;li&gt;Smooth, technical front with textured mesh back.&lt;/li&gt;&lt;li&gt;Drawstring bottom for adjustable fit.&lt;/li&gt;&lt;li&gt;Raglan sleeves.&lt;/li&gt;&lt;li&gt;Available in forest green with the white Google logo embroidered at left chest.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 50.20, code: 'EUR' },
  }, {
    sku: '10-14154',
    title: 'Anvil L/S Crew Neck - Grey',
    description: 'You\'ll be swooning over this crew neck as soon as you feel how soft it is.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;40% preshrunk ring-spun cotton, 60% polyester terry fleece.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Available in dark heather charcoal with the white Google logo screen printed across center chest.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 22.15, code: 'EUR' },
  }, {
    sku: '10-14157',
    title: 'Green Flex Fleece Zip Hoodie',
    description: 'Ultra soft. Ultra cozy. Our popular flex fleece hoodie now available in speckled green.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;50% cotton / 50% polyester.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Made in the USA.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Full-zip.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Available in green with specks of blue and the white Google logo embroidered at left bicep.&amp;nbsp;&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 45.65, code: 'EUR' },
  }, {
    sku: '10-15041',
    title: 'Android Nylon Packable Jacket',
    description: 'Pack. Pack. Pack it up! This nylon jacket with reflective trim can literally be packed into itself in seconds. Features a waterproof nylon fabric, Android eyes &amp;amp; antennaes on the hood and a  carrying strap when jacket is fully packed. Android robot is printed on back above zipper in a reflective, metallic finish.',
    price: { value: 33.60, code: 'EUR' },
  }, {
    sku: '10-14133',
    title: 'YouTube Ultimate Hooded Sweatshirt',
    description: 'Stay warm in this cozy hoodie made of 50% cotton and 50% polyester. This comfortable design features set in sleeves, dyed to match draw cord and a front pouch pocket. Available in Charcoal with the full color YouTube logo screen printed across the chest. Unisex sizing.',
    price: { value: 32.35, code: 'EUR' },
  }, {
    sku: '10-14160',
    title: 'Grey Heather Fleece Zip Hoodie',
    description: 'Cozy up with this full-zip hoodie.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;60% combed, ring-spun cotton, 40% polyester.&lt;/li&gt;&lt;li&gt;Unisex sizing.&lt;/li&gt;&lt;li&gt;Retail fit.&lt;/li&gt;&lt;li&gt;Contrast zipper.&lt;/li&gt;&lt;li&gt;Kangaroo pockets with ribbed cuffs and waistband.&lt;/li&gt;&lt;li&gt;Available in dark heather with the white Google logo embroidered at left chest.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;',
    price: { value: 38.85, code: 'EUR' },
  }, {
    sku: '10-14153',
    title: 'Vastrm Hoodie',
    description: 'The ultimate in fit and fabric, this Vastrm hoodie doesn\'t disappoint. Made from soft pique fabric, the lightweight full-zip features a halfmoon accent and matching hoodie strings.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Additional Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% cotton.&lt;/li&gt;&lt;li&gt;Hidden phone pocket neatly cradles your digital device.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Available in charcoal grey with red strings and hood. White Google logo is embroidered at left bicep.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 200.00, code: 'EUR' },
  }, {
    sku: '10-14158',
    title: 'Recycled Plastic Bottle Hoodie - Green',
    description: 'Ever wonder where all of the disposable water bottles of the world end up? We know some of them are reused for a second purpose. Each of these hoodies contain approximately 9 recycled water bottles that are woven into the fabric.&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&amp;nbsp;&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;50% recycled cotton, 50% recycled polyester.&lt;/li&gt;&lt;li&gt;Full zipper and orange drawstring pulls.&lt;/li&gt;&lt;li&gt;USA made.&amp;nbsp;&lt;/li&gt;&lt;li&gt;&amp;nbsp;Available in forest green with the white Google logo embroidered at left bicep.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 60.95, code: 'EUR' },
  }, {
    sku: '10-14152',
    title: 'Rowan Pullover Hood',
    description: 'In search of the perfect layering piece? This lightweight, triblend pullover is ultra soft and ideal for all seasons.&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;50% polyester, 38% cotton, 12% rayon triblend.&lt;/li&gt;&lt;li&gt;Available in black with the white Google logo screenprinted at left bicep.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 60.85, code: 'EUR' },
  }, {
    sku: '10-14155',
    title: 'Men\'s Voyage Fleece Jacket',
    description: '&lt;div&gt;Perhaps the equivalent to that comfort blanket you had years ago is a cozy fleece. This full-zip is the perfect layering piece for those \'in-between\' months when mother nature just can\'t make up her mind.&amp;nbsp;&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% polyester anti-pill yarn fleece.&lt;/li&gt;&lt;li&gt;100% polyester taffeta lining in sleeves.&lt;/li&gt;&lt;li&gt;Tricot-lined lower pockets with reverse coil zippers.&lt;/li&gt;&lt;li&gt;Available in black with the white Google logo embroidered at left chest.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 48.00, code: 'EUR' },
  }, {
    sku: '10-14159',
    title: 'Eco-Jersey Chrome Zip Up Hoodie',
    description: 'An exceptionally soft, eco-friendly full-zip for picture-perfect layering.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;50% polyester, 38% cotton (6.25% recycled), 12% rayon (6.25% organic).&lt;/li&gt;&lt;li&gt;Low-impact yarn dyed and washed.&lt;/li&gt;&lt;li&gt;Brushed nickel zipper with natural taping.&lt;/li&gt;&lt;li&gt;Split front pouch pocket.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Available in deep pacific blue with the white Google Chrome logo screenprinted at left chest.&amp;nbsp;&lt;/li&gt;&lt;/ul&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;/div&gt;',
    price: { value: 37.75, code: 'EUR' },
  }, {
    sku: '10-14146',
    title: 'Android Colorblock Hooded Pullover',
    description: 'This cozy Android hoodie features a sublimated camo design printed inside hood and along inner sleeves and side panels.  Moisture-wicking polyester fabric keeps you cool and dry.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% polyester.&lt;/li&gt;&lt;li&gt;Ultra soft, fleece interior.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Available in smoke/lime green with the white Android robot embroidered at left chest.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 50.20, code: 'EUR' },
  }, {
    sku: '10-14216',
    title: 'Tri-blend Full-Zip Hoodie',
    description: 'Comfy cool. This canvas tri-blend full-zip hoodie made of a poly/cotton/rayon blend is sure to please the eyes as well as the senses. Made in the USA. Available in Black with the white Google logo embroidered at left chest.',
    price: { value: 52.20, code: 'EUR' },
  }, {
    sku: '10-14215',
    title: 'Fleece Full-Zip Hoodie',
    description: 'If you find that the \'spark\' is missing from your outfit, you may need to add one of these full-zip hoodies to the mix. Resurfacing from 1989, this colorful full-zip features a sporty fit with ultra soft fleece lining.&lt;div&gt;&lt;br&gt;&lt;div&gt;Additional Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;50% polyester and 50% cotton fleece.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Available in blue with the Google logo embroidered in white at left bicep.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;&lt;/div&gt;',
    price: { value: 45.65, code: 'EUR' },
  }, {
    sku: '10-14217',
    title: 'Jacquard-Knit Full-Zip Fleece',
    description: 'We love color contrast, especially in Google Blue! This textured jacket features a jacquard texture with contrast stitching and zippers.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Additional Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% polyester.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Audio port access available on inside left pocket.&lt;/li&gt;&lt;li&gt;Available in Carbon/Olympic Blue with the Google logo embroidered in white on left chest.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 74.90, code: 'EUR' },
  }, {
    sku: '10-15103',
    title: 'YouTube Unisex Flex Fleece Zip Hoodie',
    description: 'Our popular flex fleece hoodie, now for YouTube fans everywhere.&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;50% polyester, 50% cotton fleece.&lt;/li&gt;&lt;li&gt;Sporty, unisex fit.&lt;/li&gt;&lt;li&gt;Metal zipper.&lt;/li&gt;&lt;li&gt;Hood.&lt;/li&gt;&lt;li&gt;Available in dark heather grey with the YouTube logo embroidered at left bicep.&lt;/li&gt;&lt;/ul&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;/div&gt;',
    price: { value: 45.25, code: 'EUR' },
  }] as const,
  'ladies-outerwear': [{
    sku: '10-24102',
    title: 'Ladies Modern Stretch Full Zip',
    description: 'With an updated fit and figure-flattering details, this full-zip combines ultra soft cotton with a dash of spandex to retain its shape all day long.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;96% cotton, 4% spandex.&lt;/li&gt;&lt;li&gt;Gently contoured silhouette &amp;amp; longer length design for a style that moves with you.&lt;/li&gt;&lt;li&gt;Self-fabric hood.&lt;/li&gt;&lt;li&gt;Dyed-to-match zipper.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Front slash pockets.&lt;/li&gt;&lt;li&gt;Open cuffs &amp;amp; hem.&lt;/li&gt;&lt;li&gt;Available in Mosaic Blue with the white Google logo embroidered at left chest.&amp;nbsp;&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 41.60, code: 'EUR' },
  }, {
    sku: '10-25058',
    title: 'Ladies Colorblock Wind Jacket',
    description: 'Brighten up your commute on gloomy days. This lightweight jacket features a subtle grid texture and a punch of bright pink at each side panel.&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% polyester dobby shell with jersey lining.&lt;/li&gt;&lt;li&gt;Packable zip-in hood with contrast pink zipper.&lt;/li&gt;&lt;li&gt;Cadet collar and elastic cuffs.&lt;/li&gt;&lt;li&gt;Adjustable toggles at waist can be cinched for a flattering fit.&lt;/li&gt;&lt;li&gt;Available in grey/dark rose with the white Google logo embroidered at left chest.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 45.90, code: 'EUR' },
  }, {
    sku: '10-24101',
    title: 'Ladies Voyage Fleece Jacket',
    description: '&lt;div&gt;Perhaps the equivalent to that comfort blanket you had years ago is a cozy fleece. This full-zip is the perfect layering piece for those \'in-between\' months when mother nature just can\'t make up her mind.&amp;nbsp;&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% polyester anti-pill yarn fleece.&lt;/li&gt;&lt;li&gt;100% polyester taffeta lining in sleeves.&lt;/li&gt;&lt;li&gt;Tricot-lined lower pockets with reverse coil zippers.&lt;/li&gt;&lt;li&gt;Available in purple with the white Google logo embroidered at left chest.&lt;/li&gt;&lt;li&gt;&lt;b&gt;Please note! Sizing runs larger than normal. Consider ordering a size smaller than normal.&lt;/b&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 48.00, code: 'EUR' },
  }, {
    sku: '10-24098',
    title: 'Ladies Pullover L/S Hood',
    description: 'A longsleeve layering piece with a hood. What more can you ask for between season changes?&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;85% polyester, 15% cotton.&lt;/li&gt;&lt;li&gt;Ultra lightweight, tissue jersey fabric.&lt;/li&gt;&lt;li&gt;Scoop-neck with hood.&lt;/li&gt;&lt;li&gt;Available in jewel blue with the white Google logo screenprinted across center chest.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 36.50, code: 'EUR' },
  }, {
    sku: '10-24097',
    title: 'Ladies Sonoma Hybrid Knit Jacket',
    description: 'A modern styled sport jacket that combines a classic silhouette with moisture-wicking fabrics. Technical features include a reversed coil zipper with reflective stripe, interior media exit port, and built-in media pocket.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Additional Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;94% polyester, 6% spandex.&lt;/li&gt;&lt;li&gt;Available in black with the white Google logo heat transferred onto right hip along zipper.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 84.85, code: 'EUR' },
  }, {
    sku: '10-24099',
    title: 'Ladies Yerba Knit Quarter Zip',
    description: 'This on-trend quarter zip doubles as workout gear.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;81% polyester, 19% spandex jersey knit.&lt;/li&gt;&lt;li&gt;Textured knit fabric features a moisture-wicking finish.&lt;/li&gt;&lt;li&gt;Exposed contrast reverse coil zipper with contrast inner collar.&lt;/li&gt;&lt;li&gt;Lightweight design with added stretch.&lt;/li&gt;&lt;li&gt;Available in heathered indigo with the white Google logo heat transferred vertically onto front right hip.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 64.20, code: 'EUR' },
  }] as const,
  'mens-tshirts': [{
    sku: '10-13058',
    title: 'YouTube Organic Cotton T-Shirt - Grey',
    description: 'Stay casual and cool in this 100% organic pre-shrunk cotton T-shirt. Available in charcoal grey with full-color YouTube logo screened on front.',
    price: { value: 14.75, code: 'EUR' },
  }, {
    sku: '10-13256',
    title: 'Inbox - Subtle Actions T-Shirt',
    description: 'Sometimes even the subtlest of actions can make a big difference. This tee highlights all of the icons &amp;amp; features available in your Gmail inbox!&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;60% cotton, 40% polyester blend.&lt;/li&gt;&lt;li&gt;Available in charcoal heather with the inbox icons screenprinted at front chest and inbox tag sewn onto left sleeve.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 17.05, code: 'EUR' },
  }, {
    sku: '10-13239',
    title: 'Adult Android Superhero T-Shirt',
    description: 'Mr. Kent has nothing on Super Droid, especially since this robot has only one weakness-a sweet tooth (considering all of its confectionery-themed versions)! This adorable Bella+Canvas tee features a unisex fit that is sure to please both male and female Android fans.&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Additional Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% combed, ringspun cotton.&lt;/li&gt;&lt;li&gt;Unisex fit.&lt;/li&gt;&lt;li&gt;Tag-free label for added comfort.&lt;/li&gt;&lt;li&gt;Available in royal blue with the Super Droid robot screen printed at center chest.&lt;/li&gt;&lt;li&gt;&lt;b&gt;Sizes run smaller than normal. Reference men\'s sizing chart for additional details.&lt;/b&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 14.95, code: 'EUR' },
  }, {
    sku: '10-13264',
    title: 'Men\'s Vintage Heather T-Shirt',
    description: '&lt;div&gt;A casual-cool, vintage-inspired tee perfect for all. Just remember that the best part about any classic is that it only improves with age. The more you wash it, the softer it feels.&amp;nbsp;&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;65% polyester, 35% cotton.&lt;/li&gt;&lt;li&gt;Available in heather navy, blue, purple or green with the white Google logo screened across center chest of each.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 15.8, code: 'EUR' },
  }, {
    sku: '10-13265',
    title: 'Basic Black T-Shirt',
    description: 'Word on the street is that \'black is the new black.\' Embellish your basic fashion statement with the Google logo on an authentic American Apparel t-shirt.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% organic combed cotton for ultimate softness.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Flattering fit.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Available in Black with the Google logo screen printed in White across center chest.&lt;/li&gt;&lt;li&gt;&lt;b&gt;Sizes run smaller than normal.&lt;/b&gt;&amp;nbsp;&lt;b&gt;Please reference men\'s size chart for fit.&lt;/b&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 16.9, code: 'EUR' },
  }, {
    sku: '10-13280',
    title: 'Local Guides T-Shirt',
    description: 'Do you live to explore? Are you the first to tell your friends about the best venues, restaurants and hot spots in town? If you\'re already a local guide, sport your t-shirt with pride. This ultra soft style is comfortable enough to wear all day long - perfect for all of those adventures you\'ll tell us about later. To learn more about Local Guides, visit us here:&amp;nbsp;https://www.google.com/local/guides/.&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;52% combed, ring-spun cotton / 48% polyester.&lt;/li&gt;&lt;li&gt;Retail fit.&lt;/li&gt;&lt;li&gt;Available in charcoal with the Local Guides logo screenprinted at front chest and Google logo screenprinted in white at left bicep.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 15.7, code: 'EUR' },
  }, {
    sku: '10-13213',
    title: 'Go Gopher T-Shirt in Teal',
    description: 'Go anywhere in style when wearing this t-shirt featuring The Go Gopher. &amp;nbsp;Tee is made of 100% combed, ring-spun cotton jersey fabric. Available in teal with the Go Gopher screen printed on center.',
    price: { value: 10.95, code: 'EUR' },
  }, {
    sku: '10-13285',
    title: 'Android Ringspun T-Shirt - Green',
    description: 'Display your undying love for Androids everywhere in this 100% certified organic ringspun cotton tee.&amp;nbsp;\n&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Additional Features:&amp;nbsp;&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% combed, ring-spun cotton.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Preshrunk for fashion fit.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Tearaway label.&amp;nbsp;\n&lt;/li&gt;&lt;li&gt;Available in heather green with the full color Android robot screen printed across center chest.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 8.75, code: 'EUR' },
  }, {
    sku: '10-13018',
    title: 'Organic Cotton Android walking with dog T-shirt',
    description: 'What’s better than an organic cotton t-shirt with the Android logo?  How about a t-shirt with the Android walking a dog.&amp;nbsp; &lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% smooth organic cotton.&lt;/li&gt;&lt;li&gt;Available in black with the Android design screenprinted at front chest.&lt;/li&gt;&lt;li&gt;&lt;b&gt;Sizing runs smaller than normal. Please reference size chart before ordering.&lt;/b&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 17.25, code: 'EUR' },
  }, {
    sku: '10-13270',
    title: 'Organic Cotton T-Shirt - Red',
    description: 'Looking to add a little color to your wardrobe? This striking red tee shirt is made of 100% preshrunk organic cotton, so it\'s healthy for the environment as well as for your look.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;Shoulder-to-shoulder tape.&lt;/li&gt;&lt;li&gt;Seamless collar.&lt;/li&gt;&lt;li&gt;Available in red with white Google logo screenprinted at center chest.&lt;/li&gt;&lt;li&gt;&lt;b&gt;**This shirt\'s cut is more of a generous t-shirt cut. Compared to the American Apparel shirts, sizing would run larger.**&amp;nbsp;&lt;/b&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 14.4, code: 'EUR' },
  }, {
    sku: '10-13282',
    title: 'Unisex Gmail T-Shirt',
    description: 'Show your inbox some love. The new Gmail tee has arrived, complete with a subtle Mvelope design that showcases all of the Gmail icons you use on the daily.&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;52% cotton / 48% polyester.&lt;/li&gt;&lt;li&gt;Unisex fit.&lt;/li&gt;&lt;li&gt;Bella+Canvas.&lt;/li&gt;&lt;li&gt;Available in dark grey heather with the new Gmail print screenprinted across center chest.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 15, code: 'EUR' },
  }, {
    sku: '10-13289',
    title: 'Android Soccer T-Shirt',
    description: 'When it comes to futbol formation, the world\'s most adorable robots are en pointe. Show your love for the game with this limited edition Android tee.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% cotton.&lt;/li&gt;&lt;li&gt;Made in the USA.&lt;/li&gt;&lt;li&gt;Available in navy with the Android robot design screenprinted at front.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 15.2, code: 'EUR' },
  }, {
    sku: '10-13262',
    title: 'Basic Google T-Shirt',
    description: 'Embellish your basic fashion statement with Google\'s brightly colored logo. Featuring a flattering and stylish fit for virtually any body type, this tee also boasts an ultra-soft feel.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% cotton.&lt;/li&gt;&lt;li&gt;Stretchable, reinforced shoulder construction maintains shape through repeated washings.&lt;/li&gt;&lt;li&gt;Double-stitched bottom hem ensures durability.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Available in white with the full color Google logo screenprinted across chest.&lt;/li&gt;&lt;li&gt;&lt;b&gt;Sizes run smaller than normal.&lt;/b&gt;&amp;nbsp;&lt;b&gt;Please reference men\'s size chart for fit.&lt;/b&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 13.3, code: 'EUR' },
  }, {
    sku: '10-13273',
    title: 'Tri-Blend V-Neck Tee',
    description: 'An ultra soft triblend fabric and fashionable v-neck cut make this tee perfect for everyday wear. Available in royal blue with the white Google logo screenprinted at center chest.',
    price: { value: 14.95, code: 'EUR' },
  }, {
    sku: '10-13272',
    title: 'Heather Pocket Tee - Light Blue',
    description: 'Pocket protector or not, you\'re sure to look pretty cool in this stylish tee.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;60% cotton, 40% polyester.&lt;/li&gt;&lt;li&gt;Tagless label for added comfort.&lt;/li&gt;&lt;li&gt;Available in light blue with a grey pocket and the white Google logo screenprinted at center pocket.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 23.3, code: 'EUR' },
  }, {
    sku: '10-13276',
    title: 'Google Now Skyline T-Shirt',
    description: 'A bright and sunny 360° illustration of San Francisco wrapped around this American Apparel t-shirt. This tee, popular at the Googleplex in Mountain View, CA is now available just for you!&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% cotton.&lt;/li&gt;&lt;li&gt;Available in Aqua with the Google Now logo screen printed in Gray across chest.&lt;/li&gt;&lt;li&gt;&lt;b&gt;Sizes run smaller than normal.&lt;/b&gt;&amp;nbsp;&lt;b&gt;Please reference men\'s size chart for fit.&lt;/b&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 20.2, code: 'EUR' },
  }, {
    sku: '10-11019',
    title: 'Tri-Blend G Logo Men\'s Polo',
    description: 'Stock up on this comfy-cool polo featuring the new Google \'G.\'&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;50% polyester / 25% cotton / 25% rayon&lt;/li&gt;&lt;li&gt;Tri-blend fabric retains shape and elasticity.&lt;/li&gt;&lt;li&gt;Retail fit.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Single front pocket.&lt;/li&gt;&lt;li&gt;Three-button placket.&lt;/li&gt;&lt;li&gt;Structured collar holds shape through repeated washing.&lt;/li&gt;&lt;li&gt;Available in black with the Google \'G\' icon embroidered at left chest.&amp;nbsp;&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 32.7, code: 'EUR' },
  }, {
    sku: '10-11017',
    title: 'Tri-Blend Leisure Shirt',
    description: 'Dress it up, or dress it down. We promise you\'ll fall in love with the versatility of this triblend polo.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&amp;nbsp;&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;50/25/25 polyester/cotton/rayon blend.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Three-button placket with structured self-fabric collar and left chest pocket.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Available in black with the Google logo embroidered at right sleeve.&lt;/li&gt;&lt;li&gt;&lt;b&gt;Sizes run smaller than normal. Please reference size chart before ordering.&lt;/b&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 32.95, code: 'EUR' },
  }, {
    sku: '10-13153',
    title: 'Wise Android T-Shirt',
    description: 'Take a word from the wise: put on this tee and you\'ll fall in love! Made of 100% preshrunk certified organic cotton for ultimate softness. Available in black with the Wise Android screen printed on the front chest.',
    price: { value: 14.95, code: 'EUR' },
  }, {
    sku: '10-13279',
    title: 'Android Pride T-Shirt',
    description: '&lt;p&gt;Stand out and stand proud in this Android Pride T-shirt.&amp;nbsp;&lt;/p&gt;&lt;p&gt;Features:&lt;/p&gt;&lt;p&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;100% cotton American Apparel t-shirt.&lt;/li&gt;&lt;li&gt;Available in black, and features two Androids holding hands and waving a rainbow flag screenprinted at center chest. Google logo is screenprinted in white at sleeve.&lt;/li&gt;&lt;li&gt;&lt;b&gt;Sizing runs smaller than normal. Please reference size chart before ordering.&lt;/b&gt;&lt;/li&gt;&lt;/ul&gt;',
    price: { value: 19.1, code: 'EUR' },
  }, {
    sku: '10-13286',
    title: 'Chrome Unisex T-Shirt',
    description: 'Show your love for Google Chrome in this 100% combed ring-spun cotton T-Shirt.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;Soft, jersey fabric.&lt;/li&gt;&lt;li&gt;Unisex fit.&lt;/li&gt;&lt;li&gt;Available in dark heather grey with the new Google Chrome logo screenprinted at front.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 11.35, code: 'EUR' },
  }, {
    sku: '10-13271',
    title: 'NY City Lights T-Shirt',
    description: 'Are you feeling lucky? This anniversary t-shirt celebrates the Big Apple.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% cotton American Apparel shirt.&lt;/li&gt;&lt;li&gt;Available in Black with the Google logo and \'I\'m Feeling Lucky\' New York printed on back yoke in White.&lt;/li&gt;&lt;li&gt;&lt;b&gt;Sizes run smaller than normal. Please reference men\'s size chart for fit before ordering.&lt;/b&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 18.35, code: 'EUR' },
  }, {
    sku: '10-13267',
    title: 'Omi Tech Tee',
    description: 'This performance tee deserves to be one of your wardrobe staples. Micro-polyester mesh fabric is snag-resistant, moisture-wicking and provides UV protection for sunny days. Available in royal blue with the white Google logo transferred onto center chest.',
    price: { value: 17, code: 'EUR' },
  }, {
    sku: '10-13278',
    title: 'YouTube S/S Triblend T-Shirt',
    description: 'A perfect blend of three fabrics. This fashionably soft tee is perfect for layering or wearing solo.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;50% polyester, 25% combed, ring-spun cotton.&lt;/li&gt;&lt;li&gt;Retail fit.&lt;/li&gt;&lt;li&gt;Unisex sizing.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Available in black with the full color YouTube logo screenprinted at center chest.&amp;nbsp;&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 14.9, code: 'EUR' },
  }, {
    sku: '10-13241',
    title: 'Nest T-Shirt',
    description: 'We know energy savings make you smile. Why not put on an even bigger grin with this teal Nest t-shirt?&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% combed cotton.&lt;/li&gt;&lt;li&gt;Made in the USA.&lt;/li&gt;&lt;li&gt;Available in teal with the white Nest icon screen printed across chest.&lt;/li&gt;&lt;li&gt;&lt;b&gt;Sizing runs smaller than normal. Please reference size chart before ordering.&lt;/b&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 17.4, code: 'EUR' },
  }, {
    sku: '10-13291',
    title: '98 Short Sleeve Tee',
    description: 'Classic front. Retro back. This comfy grey tee celebrates Google\'s heritage, featuring the vintage \'98\' logo at back.&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% cotton.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Available in grey with the white Google logo screenprinted at left chest and the vintage \'98\' screenprinted at back in red, white and blue.&amp;nbsp;&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;',
    price: { value: 14.3, code: 'EUR' },
  }, {
    sku: '10-13260',
    title: 'Cardboard T-Shirt',
    description: 'Crazy for Cardboard? Show your love with this super soft t-shirt. If you\'re new to the virtual reality scene, check out Google Cardboard here:&amp;nbsp;https://www.google.com/get/cardboard/&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;60% cotton, 40% polyester.&lt;/li&gt;&lt;li&gt;Available in charcoal with a Cardboard viewer textured metallic heart at front chest and the Cardboard short url screenprinted at back yoke.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 14.2, code: 'EUR' },
  }, {
    sku: '10-13266',
    title: 'Short Sleeve Crew Neck Raglan',
    description: 'This vintage style t-shirt features a soft jersey fabric comfortable enough to sleep in.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;60% cotton, 40% polyester.&lt;/li&gt;&lt;li&gt;Self fabric contrast neckband and sleeves.&lt;/li&gt;&lt;li&gt;Available in light blue/indigo with the white Google logo screenprinted across center chest.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 13.1, code: 'EUR' },
  }, {
    sku: '10-13292',
    title: 'MTV Unisex Blue T-Shirt',
    description: 'They say home is where the heart is. This vibrant tee features the Bay Area address of Google\'s head office.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% combed cotton.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Made in the USA.&lt;/li&gt;&lt;li&gt;Available in royal blue with a striking design at front and the white Google logo at back yoke.&amp;nbsp;&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 15.75, code: 'EUR' },
  }, {
    sku: '10-13268',
    title: 'Organic Me-To-We Tee',
    description: 'Buy a tee that gives back. Half of the profits from each organic crewneck tee are distributed to the international charity and educational partner, Free the Children.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% organic cotton.&lt;/li&gt;&lt;li&gt;For more information on Free the Children &amp;amp; Me to We, visit http://www.freethechildren.com/about-us/our-story/.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Available in blue with the white Google logo screenprinted at center chest.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 23.6, code: 'EUR' },
  }, {
    sku: '10-13274',
    title: 'Tri-Blend Raglan Long Sleeve',
    description: 'Whether you\'re stealing second, cheering in the stands, or you just love the look of a classic \'baseball\' tee, consider this raglan version for your apparel roster.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;50% polyester, 38% cotton, 12% rayon super soft triblend.&lt;/li&gt;&lt;li&gt;Fashionable fit.&lt;/li&gt;&lt;li&gt;Machine washable.&lt;/li&gt;&lt;li&gt;Available in grey/black with the white Google logo screenprinted at center chest.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 51.2, code: 'EUR' },
  }, {
    sku: '10-13240',
    title: 'Blueprint for a Better Inbox T-Shirt',
    description: 'This new "Blueprint for &amp;nbsp;better Inbox" t-shirt will be your new favorite t-shirt. &amp;nbsp;It\'s a USA made American Apparel t-shirt sporting the new logo.&lt;div&gt;&lt;br&gt;&lt;div&gt;Additional Features:&amp;nbsp;&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;50% cotton / 50% polyester for a super soft feel&amp;nbsp;&lt;/li&gt;&lt;li&gt;Unisex fit.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Available in royal blue heather with the "New Inbox: logo screen printed on the center chest.&lt;/li&gt;&lt;li&gt;&lt;b style=""&gt;Sizing runs smaller than normal. Please reference men\'s sizing chart prior to ordering.&lt;/b&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;&lt;/div&gt;',
    price: { value: 14.3, code: 'EUR' },
  }, {
    sku: '10-13097',
    title: 'YouTube Player T-Shirt - Unisex',
    description: '&lt;p&gt;The YouTube Player T-Shirt has arrived. This t-shirt, much coveted by YouTube employees, is now available to the public. Channel your inner player and profess your love for YouTube with this clever design.&amp;nbsp;&lt;/p&gt;&lt;p&gt;Features:&lt;/p&gt;&lt;p&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;100% combed cotton.&lt;/li&gt;&lt;li&gt;Reinforced shoulder construction to maintain shape.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Available in red with the Player logo screenprinted at front chest and YouTube logo screenprinted at back yoke.&lt;/li&gt;&lt;li&gt;&lt;b&gt;Sizes run smaller than normal. Please reference size chart before ordering.&lt;/b&gt;&lt;/li&gt;&lt;/ul&gt;&lt;p&gt;&lt;/p&gt;\n&lt;p&gt;&lt;br&gt;&lt;/p&gt;',
    price: { value: 17.8, code: 'EUR' },
  }, {
    sku: '10-13275',
    title: 'G Logo White T-Shirt',
    description: 'There\'s a new G in town and it\'s here to stay. Get your hands on this comfy white tee featuring the new Google icon.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% combed, ringspun cotton.&lt;/li&gt;&lt;li&gt;Side-seamed.&lt;/li&gt;&lt;li&gt;Unisex size, retail fit by Bella+Canvas.&lt;/li&gt;&lt;li&gt;Available in white with the Google \'G\' icon screenprinted at front.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 13, code: 'EUR' },
  }, {
    sku: '10-13130',
    title: 'Android Concert T-Shirt',
    description: 'Back by popular demand! Rock out with this Android Concert t-shirt.&amp;nbsp; &lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% combed cotton.&lt;/li&gt;&lt;li&gt;Made in the USA.&lt;/li&gt;&lt;li&gt;Available in grey with the Android screen printed in orange at center chest.&amp;nbsp;&lt;/li&gt;&lt;li&gt;&lt;b&gt;Sizing runs smaller than normal. Please reference size chart before ordering.&lt;/b&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 13.65, code: 'EUR' },
  }, {
    sku: '10-13269',
    title: 'Men\'s Bamboo T-Shirt',
    description: '\'Seriously soft\' is one phrase we\'re not afraid to throw around when it comes to these bamboo tees.&amp;nbsp;Made with 70% viscose from organic bamboo and 30% organic cotton, your skin will thank you during those long nights of programming.&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;&amp;nbsp;Available in blue with the Google logo screen printed in white across center chest.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 20.65, code: 'EUR' },
  }, {
    sku: '10-13263',
    title: 'Android Pay Crew Neck T-Shirt',
    description: 'Wear. Wash. Repeat. This tee celebrates the most exciting way to pay for life\'s necessities. For more information on Android Pay, visit our site here; https://www.android.com/pay/.&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;60/40 cotton/polyester blend.&lt;/li&gt;&lt;li&gt;Tagless label for added comfort.&lt;/li&gt;&lt;li&gt;Made in the USA.&lt;/li&gt;&lt;li&gt;Available in Pepper Black with the Android Pay icon screenprinted at front chest and Android Pay logo text at left sleeve.&lt;/li&gt;&lt;/ul&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;/div&gt;',
    price: { value: 19.4, code: 'EUR' },
  }, {
    sku: '10-13277',
    title: 'Google Maps T-Shirt',
    description: 'Make a geographical statement with this royal blue American Apparel tee.&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% combed cotton.&lt;/li&gt;&lt;li&gt;Available in royal with the Google Maps pin and "I am here" text on the front, Google Maps logo on the back, and URL on the sleeve.&amp;nbsp;&lt;/li&gt;&lt;li&gt;&lt;b&gt;Sizes run smaller than normal. Please reference size chart before ordering.&lt;/b&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 18.35, code: 'EUR' },
  }, {
    sku: '10-13290',
    title: 'Est. 98 Baseball Tee',
    description: 'Hit a home run in the style stakes with this classic baseball tee. Designed with traditional contrast sleeves and an \'est 98\' graphic honoring the year Google was founded.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;Unisex fit.&lt;/li&gt;&lt;li&gt;52% cotton, 48% polyester.&lt;/li&gt;&lt;li&gt;Available in white with black sleeves and the white Google logo printed at left bicep.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 17.9, code: 'EUR' },
  }, {
    sku: '10-13288',
    title: 'Mountain View T-Shirt',
    description: 'The Bay Area city named for its beautiful views of the Santa Cruz Mountains is also home to the Googleplex located at 1600 Amphitheater Parkway. Celebrate the place Google calls home in this American Apparel tee.&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% combed cotton.&lt;/li&gt;&lt;li&gt;Made in Los Angeles.&lt;/li&gt;&lt;li&gt;Available in white with the Mountain View coordinates screenprinted at front and the full color Google logo screenprinted at back yoke.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 16.5, code: 'EUR' },
  }] as const,
  'ladies-tshirts': [{
    sku: '10-23180',
    title: 'Ladies Chrome T-Shirt',
    description: 'The best of three fabrics combined into one seductively-soft tee.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;50% polyester, 25% combed and ring-spun cotton, 25% rayon.&lt;/li&gt;&lt;li&gt;Side-seamed.&lt;/li&gt;&lt;li&gt;Semi-relaxed fit.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Available in heather blue with the white Google Chrome logo screenprinted at center chest.&amp;nbsp;&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 13.30, code: 'EUR' },
  }, {
    sku: '10-23226',
    title: 'Ladies Google New York T-Shirt',
    description: 'Are you feeling lucky? Inspired by city lights in The Big Apple, this tee features the \'I\'m Feeling Lucky New York\' phrase at back.&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% cotton.&lt;/li&gt;&lt;li&gt;American Apparel shirt designed with a ladies fit in mind.&lt;/li&gt;&lt;li&gt;Available in Black with the Google logo and \'I\'m Feeling Lucky\' New York printed on back yoke in White.&lt;/li&gt;&lt;li&gt;&lt;b&gt;Sizing runs smaller than normal. Please reference size chart before ordering.&lt;/b&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 18.35, code: 'EUR' },
  }, {
    sku: '10-23179',
    title: 'Ladies Gmail T-Shirt',
    description: 'Show your inbox some love. The new Gmail tee has arrived, complete with a subtle Mvelope design that showcases all of the Gmail icons you use on the daily.&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;50% polyester, 25% cotton.&lt;/li&gt;&lt;li&gt;Bella+Canvas.&lt;/li&gt;&lt;li&gt;Available in vintage red with the new Gmail print screenprinted across center chest.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 16.40, code: 'EUR' },
  }, {
    sku: '10-23178',
    title: 'Ladies G Logo White T-Shirt',
    description: 'There\'s a new G in town and it\'s here to stay. Get your hands on this comfy white tee with the new Google icon.&amp;nbsp;\n\n&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&amp;nbsp;&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% combed and ring-spun cotton.&lt;/li&gt;&lt;li&gt;Side seamed, relaxed fit.&lt;/li&gt;&lt;li&gt;Bella+Canvas.&lt;/li&gt;&lt;li&gt;Available in white with the Google \'G\' icon screenprinted at front.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 13.30, code: 'EUR' },
  }, {
    sku: '10-23177',
    title: 'Ladies Android Pride T-Shirt',
    description: 'Stand out proud in this Ladies\' Android Pride T-shirt.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% cotton.&lt;/li&gt;&lt;li&gt;Available in black and features two Androids holding hands and waving a rainbow flag printed across the front. Google logo screen printed in white on the sleeve.&amp;nbsp;&lt;/li&gt;&lt;li&gt;&lt;b&gt;Sizing runs smaller than normal. Please reference size chart before ordering.&lt;/b&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 19.10, code: 'EUR' },
  }, {
    sku: '10-23172',
    title: 'Ladies Ringspun Crew Neck',
    description: 'Cheery colors make the world a happier place. This bright pink tee is ultra soft and features a comfortable, ladies fit.&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% cotton.&lt;/li&gt;&lt;li&gt;Tagless label for added comfort.&lt;/li&gt;&lt;li&gt;&lt;b&gt;Relaxed fit.&lt;/b&gt;&lt;/li&gt;&lt;li&gt;Available in hot pink with the white Google logo screenprinted at center chest.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 19.70, code: 'EUR' },
  }, {
    sku: '10-23227',
    title: 'Ladies Tri-Blend V-Neck T-Shirt',
    description: 'A tagless label, ultra soft triblend fabric and v-neck cut are three ingredients for a favorite tee.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;25% cotton, 50% polyester, 25% rayon.&lt;/li&gt;&lt;li&gt;Made in California.&lt;/li&gt;&lt;li&gt;Available in green with the white Google logo screenprinted at center chest.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 35.10, code: 'EUR' },
  }, {
    sku: '10-23228',
    title: 'Bella Ladies Favorite Tee',
    description: 'This ladies tee features a longer body length perfect for layering up.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% combed, ringspun cotton.&lt;/li&gt;&lt;li&gt;Extra soft, lightweight fabric.&lt;/li&gt;&lt;li&gt;&lt;b&gt;Slim fit. Runs small.&amp;nbsp;&lt;/b&gt;&lt;/li&gt;&lt;li&gt;Available in aqua with the white Google logo screenprinted at center chest.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 10.50, code: 'EUR' },
  }, {
    sku: '10-23176',
    title: 'Ladies Bamboo T-Shirt',
    description: 'A bamboo tee that\'s softer than your favorite cotton t-shirt. Your skin will thank you during those long nights of programming.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;70% viscose from organic bamboo, 30% organic cotton.&lt;/li&gt;&lt;li&gt;Available in vintage pink with the white Google logo screen printed at center chest.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 20.65, code: 'EUR' },
  }, {
    sku: '10-23173',
    title: 'Ladies L/S Colorblock Raglan',
    description: 'Add a dose of mango to your t-shirt lineup. This scoop neck raglan features a bright pop of color and a scoop neck with v-notch.&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;60% cotton, 40% polyester.&lt;/li&gt;&lt;li&gt;Scoop hem.&lt;/li&gt;&lt;li&gt;Self-fabric cuff bands.&lt;/li&gt;&lt;li&gt;Available in heather/mango with the white Google logo screenprinted at center chest.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 36.95, code: 'EUR' },
  }, {
    sku: '10-23171',
    title: 'Bella Scoop-Neck Ladies T-Shirt',
    description: 'A classic that\'s here to stay is this ladies white baby ribbed tee. Features a feminine scoop cut at the neck and 1x1 baby rib texture. Available in white with the full color Google logo screen printed at center chest.',
    price: { value: 13.10, code: 'EUR' },
  }, {
    sku: '10-23225',
    title: 'Ladies Not For Sale T-Shirt',
    description: 'This Not for Sale t-shirt features just the right amount of \'V\' around the neck with the Google logo placed perfectly underneath. Not for Sale focuses efforts on growing social enterprises to benefit those enslaved and vulnerable communities around the world.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;Available in black with the Google logo imprinted in white across upper chest.&lt;/li&gt;&lt;li&gt;&lt;b&gt;Sizing runs smaller than normal. Please consider ordering up one or two sizes.&lt;/b&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 24.00, code: 'EUR' },
  }, {
    sku: '10-23198',
    title: 'Ladies Android L/S Stretch T-Shirt',
    description: 'Sparkle and shine in this ladies long sleeve stretch tee.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features;&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;95% premium, ring-spun cotton, 5% spandex.&lt;/li&gt;&lt;li&gt;Available in Black with a glitter Android robot at left chest.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 20.00, code: 'EUR' },
  }, {
    sku: '10-23229',
    title: 'Ladies Mountain View T-Shirt',
    description: 'The Bay Area city named for its beautiful views of the Santa Cruz Mountains is also home to the Googleplex located at 1600 Amphitheater Parkway. Celebrate the place Google calls home in this ladies scoop neck tee.&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% cotton.&lt;/li&gt;&lt;li&gt;Available in white with the Mountain View coordinates screenprinted at front and the full color Google logo screenprinted at back yoke.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 17.50, code: 'EUR' },
  }, {
    sku: '10-23169',
    title: 'Ladies Blueprint for a Better Inbox T-Shirt',
    description: 'The "Blueprint for  better Inbox" now available for the ladies! This USA made American Apparel t-shirt sports a more fitted design and &amp;nbsp;the new Inbox logo.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Additional Features:&amp;nbsp;&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;50% cotton / 50% polyester for a super soft fit.&lt;/li&gt;&lt;li&gt;Available in royal blue heather with the "New Inbox: logo screen printed on the center chest.&amp;nbsp;&lt;/li&gt;&lt;li&gt;&lt;b&gt;Sizing runs smaller than normal. Please reference sizing chart prior to ordering.&lt;/b&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 14.30, code: 'EUR' },
  }, {
    sku: '10-23174',
    title: 'Ladies Cotton Poly w/ Thermal Tee',
    description: 'This thermal long sleeve t-shirt is lightweight enough for all seasons of the year.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;60% cotton, 40% polyester.&lt;/li&gt;&lt;li&gt;Wide boat neck, thermal sleeves and hight length thermal cuffs.&lt;/li&gt;&lt;li&gt;Longer body for comfortable fit.&lt;/li&gt;&lt;li&gt;Available in blue/black with the white Google logo screenprinted at center chest.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 15.15, code: 'EUR' },
  }, {
    sku: '10-23073',
    title: 'Ladies YouTube Favorite Tee',
    description: 'It\'s called the \'favorite tee\' for a reason. Designed with fashion and comfort in mind, this ladies tee is ultra soft and provides a great fit, every time.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% combed, ring-spun cotton.&lt;/li&gt;&lt;li&gt;Designed with a longer length for varying body types.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Available in asphalt with the full color YouTube logo screen printed across center chest.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 11.10, code: 'EUR' },
  }, {
    sku: '10-23230',
    title: 'MTV Ladies Yellow T-Shirt',
    description: 'They say home is where the heart is. This vibrant tee features the Bay Area address of Google\'s head office. &amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% combed cotton.&lt;/li&gt;&lt;li&gt;Made in the USA.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Available in gold with a striking design at front and the white Google logo at back yoke.&amp;nbsp;&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 16.90, code: 'EUR' },
  }, {
    sku: '10-23069',
    title: 'Women\'s Android Heart T-Shirt',
    description: 'The softest, smoothest, best-looking, organic cotton tee shirt available anywhere.&amp;nbsp;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Features:&lt;/div&gt;&lt;div&gt;&lt;ul&gt;&lt;li&gt;100% certified organic, combed, ringspun cotton.&lt;/li&gt;&lt;li&gt;Contoured to flatter women\'s curves.&lt;/li&gt;&lt;li&gt;Double-needle stitching on the sleeves and bottom hem.&lt;/li&gt;&lt;li&gt;TearAway™ label for added comfort.&amp;nbsp;&lt;/li&gt;&lt;li&gt;Available in Berry with a screened Android robot at front chest.&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;',
    price: { value: 10.60, code: 'EUR' },
  }] as const,
}
