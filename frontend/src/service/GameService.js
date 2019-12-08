import {ACCESS_TOKEN, API_BASE_URL} from "../constant";
import {request} from "./RequestConfig";

export function game() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/api/game",
        method: 'GET'
    });
}

export function create(game) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/api/game",
        method: 'POST',
        body: JSON.stringify(game)
    });
}

export function deleteById(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/api/game?id=" + id,
        method: 'DELETE',
    });
}

export function gamesCount() {
    return request({
        url: API_BASE_URL + "/api/game/count",
        method: 'GET',
    });
}