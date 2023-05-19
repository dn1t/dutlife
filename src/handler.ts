import express from 'express';
import { fetch } from './utils/fetch';
import { graphql } from './utils/graphql';
import type { Tokens } from './types';

const app = express();

const tokens: Tokens = {};

async function getTokens() {
  try {
    if (tokens.updated && Date.now() - tokens.updated <= 1000 * 60 * 60 * 3)
      return tokens;

    const res = await fetch('https://playentry.org');
    const html = await res.text();

    const __NEXT_DATA__ =
      /\<script id="__NEXT_DATA__".*\>((.|\n)+)\<\/script\>/.exec(html)?.[1];
    if (!__NEXT_DATA__) return tokens;

    const parsedData = JSON.parse(__NEXT_DATA__);

    const csrfToken = parsedData.props.initialProps.csrfToken;
    const xToken = parsedData.props.initialState.common.user?.xToken;

    tokens.csrfToken = csrfToken;
    tokens.xToken = xToken;
    tokens.updated = Date.now();

    return tokens;
  } catch (_) {
    console.log(_);
    return tokens;
  }
}

app.get('/api/search', async (req, res) => {
  const query = req.query.query?.toString();
  const tokens = await getTokens();

  const data = await graphql<{
    projectList: {
      total: number;
      list: {
        name: string;
        ranked: boolean;
        user: {
          id: string;
          username: string;
          nickname: string;
          profileImage: {
            filename: string;
            imageType: string;
          };
        };
        thumb: string;
        updated: string;
      }[];
      searchAfter: [number, number, number];
    };
  }>(
    `query SEARCH($query: String, $display: Int) {
      projectList(query: $query, pageParam: { sorts: ["_score", "likeCnt"], display: $display }, searchType: "scroll") {
        total
        list {
          name
          ranked
          user {
            id
            username
            nickname
            profileImage {
              filename
              imageType
            }
          }
          thumb
          updated
        }
        searchAfter
      }
    }`,
    { query, display: 16 },
    tokens,
  );

  res.send({
    total: data.projectList.total,
    list: data.projectList.list.map((item) => {
      const hasProfileImage = !!item.user.profileImage;

      return {
        name: item.name,
        user: {
          id: item.user.id,
          username: item.user.username,
          nickname: item.user.nickname,
          profileImage: hasProfileImage
            ? `https://playentry.org/uploads/${item.user.profileImage?.filename?.slice(
                0,
                2,
              )}/${item.user.profileImage?.filename?.slice(2, 4)}/${
                item.user.profileImage?.filename
              }.${item.user.profileImage?.imageType}`
            : 'https://playentry.org/img/DefaultCardUserThmb.svg',
        },
        thumb: `https://playentry.org${item.thumb}`,
        updated: item.updated,
      };
    }),
    searchAfter: data.projectList.searchAfter,
  });
});

export const handler = app;
