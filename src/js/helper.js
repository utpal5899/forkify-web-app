import { promise } from 'nice-try';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const fetchreq = await fetch(url);
    const res = await Promise.race([fetchreq, timeout(10)]);
    const data = await res.json();
    // console.log(data);
    if (!res.ok) throw new Error(`${data.message}${data.status}`);
    return data;
    // console.log();
  } catch (err) {
    console.log('boom boom boom');
    throw err;
  }
};

export const sendJson = async function (url, uploaddata) {
  try {
    const fetchreq = await fetch(url, {
      method: 'Post',
      headers: {  'Content-Type': 'application/json', },
      body: JSON.stringify(uploaddata),
    });

    const res = await Promise.race([fetchreq, timeout(10)]);
    const data = await res.json();
    // console.log(data);
    if (!res.ok) throw new Error(`${data.message}${data.status}`);
    return data;
    // console.log();
  } catch (err) {
    console.log('boom boom boom');
    throw err;
  }
};
