import axios from 'axios';
import cheerio from 'cheerio';

const getHome = async () => {
  const response = await axios.get('https://flixhq.to/home');
  if (response.data) {
    const $ = cheerio.load(response.data);
    const slides = $('#slider .swiper-wrapper .swiper-slide');
    const data = slides.get().map((slide) => {
      const poster = slide.attributes
        .find((attb) => attb.name === 'style')
        ?.value.split('(')[1]
        .split(')')[0];
      const name = $('.film-title a', slide).text();
      const description = $('.sc-desc', slide).text();
      const quality = $('.sc-detail .quality', slide).text();
      const link = $('.slide-link', slide).attr('href');
      const info = $('.sc-detail .scd-item', slide).map((i, el) => {
        const elstring = $(el).text();
        if (elstring.includes('IMDB')) {
          const IMDB = elstring.split(':')[1].trim() || '';
          return { IMDB };
        }
        if (elstring.includes('Duration')) {
          const duration = elstring.split(':')[1].trim() || '';
          return { duration };
        }
        if (elstring.includes('Genre')) {
          const genres = elstring
            .split(':')[1]
            .split(',')
            .map((text) => text.trim());
          return { genres };
        }
      });

      const data = {
        name,
        poster,
        link,
        description,
        quality,
        info: {
          duration: info.toArray()[0].duration,
          IMDB: info.toArray()[1].IMDB,
          genres: info.toArray()[2].genres,
        },
      };
      return data;
    });
    const trendingMovies = $('.section-id-01 #trending-movies .flw-item')
      .get()
      .map((item) => {
        const poster = $('.film-poster-img', item).attr('data-src');
        const link = $('.film-poster-ahref', item).attr('href');
        const name = $('.film-detail .film-name a', item).text();
        const quality = $('.film-poster-quality', item).text();
        const year = $('.fd-infor .fdi-item', item).first().text();
        const duration = $('.fd-infor .fdi-item.fdi-duration', item).first().text();
        const type = $('.fd-infor .fdi-type', item).first().text();
        return {
          name,
          poster,
          link,
          quality,
          year,
          duration,
          type,
        };
      });

    const trendingTV = $('.section-id-01 #trending-tv .flw-item')
      .get()
      .map((item) => {
        const poster = $('.film-poster-img', item).attr('data-src');
        const link = $('.film-poster-ahref', item).attr('href');
        const name = $('.film-detail .film-name a', item).text();
        const quality = $('.film-poster-quality', item).text();
        const year = $('.fd-infor .fdi-item', item).first().text();
        const duration = $('.fd-infor .fdi-item.fdi-duration', item).first().text();
        const type = $('.fd-infor .fdi-type', item).first().text();
        return {
          name,
          poster,
          link,
          quality,
          year,
          duration,
          type,
        };
      });

    // $('.section-id-02').get().map((section) => {
    //     $('.film_list-wrap.flw-item', section).map((item) => {

    //     })
    // })

    const latestMovies = $(
      '.film_list-wrap .flw-item',
      $('.section-id-02')
        .get()
        .find((item) => $('.cat-heading', item).text() === 'Latest Movies'),
    )
      .get()
      .map((item) => {
        const poster = $('.film-poster-img', item).attr('data-src');
        const link = $('.film-poster-ahref', item).attr('href');
        const name = $('.film-detail .film-name a', item).text();
        const quality = $('.film-poster-quality', item).text();
        const year = $('.fd-infor .fdi-item', item).first().text();
        const duration = $('.fd-infor .fdi-item.fdi-duration', item).first().text();
        const type = $('.fd-infor .fdi-type', item).first().text();
        return {
          name,
          poster,
          link,
          quality,
          year,
          duration,
          type,
        };
      });

    const latestTV = $(
      '.film_list-wrap .flw-item',
      $('.section-id-02')
        .get()
        .find((item) => $('.cat-heading', item).text() === 'Latest TV Shows'),
    )
      .get()
      .map((item) => {
        const poster = $('.film-poster-img', item).attr('data-src');
        const link = $('.film-poster-ahref', item).attr('href');
        const name = $('.film-detail .film-name a', item).text();
        const quality = $('.film-poster-quality', item).text();
        const year = $('.fd-infor .fdi-item', item).first().text();
        const duration = $('.fd-infor .fdi-item.fdi-duration', item).first().text();
        const type = $('.fd-infor .fdi-type', item).first().text();
        return {
          name,
          poster,
          link,
          quality,
          year,
          duration,
          type,
        };
      });

    const Incoming = $(
      '.film_list-wrap .flw-item',
      $('.section-id-02')
        .get()
        .find((item) => $('.cat-heading', item).text() === 'Coming Soon'),
    )
      .get()
      .map((item) => {
        const poster = $('.film-poster-img', item).attr('data-src');
        const link = $('.film-poster-ahref', item).attr('href');
        const name = $('.film-detail .film-name a', item).text();
        const quality = $('.film-poster-quality', item).text();
        const year = $('.fd-infor .fdi-item', item).first().text();
        const duration = $('.fd-infor .fdi-item.fdi-duration', item).first().text();
        const type = $('.fd-infor .fdi-type', item).first().text();
        return {
          name,
          poster,
          link,
          quality,
          year,
          duration,
          type,
        };
      });

    return Object.assign({
      topSlide: data,
      trending: {
        trendingMovies,
        trendingTV,
      },
      latestMovies,
      latestTV,
      Incoming,
    });
  }
  return null;
};

const FlixHQControllers = {
  getHome,
};

export default FlixHQControllers;
