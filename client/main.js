import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Collection = new Mongo.Collection('test');

// 2. Subscribe to publication
Tracker.autorun(() => {
	const sub = Meteor.subscribe('test');

	console.log('SUB READY STATE:', sub.ready());
});

Meteor.startup(() => {
	// 3. Add document using client-side insert to collection
	const id = Collection.insert({ name: 'client-side' });

	// 4. Method call won't return
	//	This just hangs forever
	Meteor.call('test', (err, data) => {
		if (err) {
			console.error(err);
		} else {
			console.log({ data });
		}
	});
});
