import {ACCESS_TOKEN, API_BASE_URL} from "../constant";
import {request} from "./RequestConfig";

export function getQuestion(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + `/api/game-action?gameId=${id}`,
        method: 'GET'
    });
}

export function answerQuestion (answer, gameId) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + `/api/game-action?gameId=${gameId}`,
        method: 'POST',
        body: answer
    });
}

export function startGame (gameId) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/api/game-action/start",
        method: 'POST',
        body: gameId
    });
}