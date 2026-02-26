import ChartCard from "@/components/chart-card";
import SectionHeader from "@/components/page-title";

export default function ChartsPage() {
  const chartsList = [
    {
      label: "Top Mundial",
      playlistId: 3155776842,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/0b92c2f9e94a1a3650f0de769c4fc07c/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top USA",
      playlistId: 1313621735,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/1afd90d72ffbcb336d228e57300a9130/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Brasil",
      playlistId: 1111141961,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/dba9d2cbf84591ce56bf18a9eb4ef4c8/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Reino Unido",
      playlistId: 1111142221,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/61230f228f1a14d6c5dd58bb42f65213/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Alemania",
      playlistId: 1111143121,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/147b95617fa371b28fd3cff7097a2171/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Francia",
      playlistId: 1109890291,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/cf960e69714cb764ad52147a2d01fd01/500x500-000000-80-0-0.jpg",
    },

    {
      label: "Top Colombia",
      playlistId: 1116188451,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/55b1900205061e3ca3f21068eef3cc9c/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Canadá",
      playlistId: 1652248171,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/e9777f2aac9b9a3ea83714fa340ca024/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top México",
      playlistId: 1111142361,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/5d8d4f716ff4815ae5c9badbbfdb0179/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Holanda",
      playlistId: 1266971851,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/fa09c4baf944f0bc4d25c05f274434a9/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Sudáfrica",
      playlistId: 1362528775,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/ae8f124cdc5fe18888c51e65b6dd4a77/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Jamaica",
      playlistId: 1362508575,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/421689468534103cb64632522dba33ad/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Venezuela",
      playlistId: 1362527605,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/b731eb81698f6873ba7f800b7520cdc4/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Ucrania",
      playlistId: 1362526495,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/e65455b9110190bf0c0840b0bf8cb4d8/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Túnez",
      playlistId: 1362525375,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/281c9a36aeb81e6be1cfd943b85adce1/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Tailaindia",
      playlistId: 1362524475,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/28ff415fbb07ce978e5d336103b5bdd9/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top El Salvador",
      playlistId: 1362523615,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/b18977b848c32578dab08debd5f35c0f/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Senegal",
      playlistId: 1362523075,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/c6eee650bf66072267aa994a0dedc93d/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Eslovenia",
      playlistId: 1362522355,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/4fb50bb731324f1d29250eab262ef005/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Arabia Saudita",
      playlistId: 1362521285,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/630c7f7e51dad25dcbde7324418e8517/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Paraguay",
      playlistId: 1362520135,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/7a04bae342ce898952330968680ad5d4/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Portugal",
      playlistId: 1362519755,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/113479e7a53e497eccb32e7a3853e745/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Filipinas",
      playlistId: 1362518895,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/2d89a884d5c418fb217f461099f57095/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Perú",
      playlistId: 1362518525,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/854e1a7beebfb6a9331b56680f4a14ef/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Malasia",
      playlistId: 1362515675,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/bb8e28ee2036e605e0d0da3b748d5450/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Líbano",
      playlistId: 1362511155,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/000ffb93500457df2d959b7889bfddb1/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Marruecos",
      playlistId: 1362512715,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/cc44527968861072c527fea000c5a068/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Corea del Sur",
      playlistId: 1362510315,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/6150aa47ecc41c5a6cea439094fb3930/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Japón",
      playlistId: 1362508955,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/9f55bdd51144dbbb717917f6b8c02e57/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Jordania",
      playlistId: 1362508765,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/d3de5f9bfb907967b42ebaf2774fe2d6/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Israel",
      playlistId: 1362507345,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/d8358e98eedc63b79f8a335c5b592a86/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Hungría",
      playlistId: 1362506695,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/06af6ab70fe5da74611e5d78b00be8c4/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Egipto",
      playlistId: 1362501615,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/e6752db30cdf217e600f99b9b36ff395/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Ecuador",
      playlistId: 1362501235,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/c249cd7b1e606f203389676664b84bb1/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Algeria",
      playlistId: 1362501015,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/434f5c5177935bdae9acda22ba664a91/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Bolivia",
      playlistId: 1362495515,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/1f45e36a08c7f8b92f4a57523054c586/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Bulgaria",
      playlistId: 1362494565,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/d04319da16f551591f53f4d2d07c7734/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Emiratos Árabes Unidos",
      playlistId: 1362491345,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/0cd014212db7e10aeda18f36205bd137/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Singapur",
      playlistId: 1313620765,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/6de8462faeb9bc25e6fcdb35735b96cd/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Noruega",
      playlistId: 1313619885,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/eb9f2320b24faa3e42f29a57dd1e5280/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top España",
      playlistId: 1116190041,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/ad4b329c58e9305035283e132d3dde67/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Suecia",
      playlistId: 1313620305,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/8372379493a378f6b15850a107ef9294/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Islandia",
      playlistId: 1313619455,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/b1c0dc1ab7bcb2607aa4fe5ff042fa17/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Dinamarca",
      playlistId: 1313618905,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/f299113b76c7a05243ccc0b4efb78bb1/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Costa Rica",
      playlistId: 1313618455,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/b4ffc718439dfffc5cdc038895f22df0/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Suiza",
      playlistId: 1313617925,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/f90ef8fc4c04bf67a1010d628affcf21/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Bélgica",
      playlistId: 1266968331,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/0923629e5b840a6ebfa0c18ecc4b4245/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Australia",
      playlistId: 1313616925,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/c88d4e3f3f5f8fa0f1b79ccc216e6a36/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Turquía",
      playlistId: 1116189071,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/29d399f0f56403d142cfb8076c6638d2/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Rusia",
      playlistId: 1116189381,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/d8e51bb32d54640cc650cbcb508b8b75/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Nigeria",
      playlistId: 1362516565,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/574a3dcc1222089e1905eef6f79e1469/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Austria",
      playlistId: 1313615765,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/9256375252d28d50bf6560a6bfcbd4fb/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Argentina",
      playlistId: 1279119721,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/24cba7609fa8995117b51e87214441f9/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Indonesia",
      playlistId: 1116188761,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/d3becf681585535f16270f6c9413ecf7/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Italia",
      playlistId: 1116187241,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/99a09b06bcabba31bafbe095740085c4/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Chile",
      playlistId: 1279119121,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/2b8ddbd8141fc7bc8d5e65eef82d6077/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Guatemala",
      playlistId: 1279118671,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/272ca12c686f647b5d365bb6b849ee45/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Rumanía",
      playlistId: 1279117071,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/c9281c9213543fc9e070d01ff1447839/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Eslovaquia",
      playlistId: 1266973701,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/4fa34ee96ce60170770f015a68f7ee44/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Serbia",
      playlistId: 1266972981,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/50fb8b444e1589044625a752e082ee50/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Kenia",
      playlistId: 1362509215,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/961dffa233dec8bbff7f9f196e0f6015/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Polonia",
      playlistId: 1266972311,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/3b0c1476d005528c3889dbb4a6f73e59/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Croacia",
      playlistId: 1266971131,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/3d4db3d1c0d6fc8e8d9f67bb2cb9e620/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top República Checa",
      playlistId: 1266969571,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/9eb445faf460ff06fd1af1e5455e2b75/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Letonia",
      playlistId: 1221037511,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/fba5945dca717e08cf2dcb723bc959ab/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Lituania",
      playlistId: 1221037371,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/5c7ffde1e6cd2c79013b1aed2fcad6e2/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Estonia",
      playlistId: 1221037201,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/d1ecc347e0274f858d610ad2871e427e/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Finlandia",
      playlistId: 1221034071,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/ba6dcd01173acd5bf4a36b7b5fe11a5d/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Honduras",
      playlistId: 1116190301,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/ea9f3253de64a18901ab4a2f88e8a912/500x500-000000-80-0-0.jpg",
    },
    {
      label: "Top Costa de Marfil",
      playlistId: 1362497945,
      cover:
        "https://cdn-images.dzcdn.net/images/playlist/9f7042d41eef07df28c2a4caacef3b55/500x500-000000-80-0-0.jpg",
    },
  ];

  return (
    <div className="size-full p-10">
      <SectionHeader>Charts Gloales</SectionHeader>

      <div className="grid grid-cols-5 p-8">
        {chartsList.map((chart) => {
          return (
            <ChartCard
              key={chart.playlistId}
              id={chart.playlistId}
              title={chart.label}
              totalSongs={100}
              coverUrl={chart.cover}
            />
          );
        })}
      </div>
    </div>
  );
}
