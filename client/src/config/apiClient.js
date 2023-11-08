import { feathers } from "@feathersjs/feathers";
import rest from "@feathersjs/rest-client";
import authentication from "@feathersjs/authentication-client";

export const app = feathers();

const restClient = rest("http://localhost:3030");

// Configure an AJAX library (see below) with that client
app.configure(restClient.fetch(window.fetch.bind(window)));
app.configure(authentication());

export const directoryService = app.service("directory");
export const fileService = app.service("file");
