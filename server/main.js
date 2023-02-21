import { onPageLoad } from "meteor/server-render";
import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

const Collection = new Mongo.Collection('test');

Collection.allow({
  insert: () => true,
});

Meteor.startup(() => {
  if (Collection.find().count() < 5) {
    Array.from({ length: 5 }).forEach((_, i) => {
      Collection.insert({ name: 'Test-' + i });
    });
  }

  // 1. Publish collection A with a selector which contains `undefined`
  Meteor.publish('test', () => {
    // This breaks the client
    return Collection.find({ name: undefined });
    // This works
    return Collection.find({ name: 'Test-0' });
  });

  Meteor.methods({
    test: () => 'Works!',
  });
});

onPageLoad(sink => {
  // Code to run on every request.
  sink.renderIntoElementById(
    "server-render-target",
    `Server time: ${new Date}`
  );
});
