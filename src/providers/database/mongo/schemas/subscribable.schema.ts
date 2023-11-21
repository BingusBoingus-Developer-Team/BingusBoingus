import {
  Model,
  Schema,
  SchemaDefinition,
  SchemaDefinitionType,
  SchemaOptions,
  CallbackWithoutResultAndOptionalError,
} from 'mongoose';

export declare type PostHookMethod =
  | 'count'
  | 'countDocuments'
  | 'deleteMany'
  | 'deleteOne'
  | 'estimatedDocumentCount'
  | 'exec'
  | 'find'
  | 'findOne'
  | 'findOneAndDelete'
  | 'findOneAndRemove'
  | 'findOneAndReplace'
  | 'findOneAndUpdate'
  | 'insertOne'
  | 'insertMany'
  | 'remove'
  | 'replaceOne'
  | 'update'
  | 'updateOne'
  | 'updateMany'
  | 'validate'
  | 'save'
  | 'remove'
  | 'updateOne'
  | 'deleteOne'
  | 'init';

export class SubscribableSchema<
  DocType = any,
  M = Model<DocType, any, any, any>,
  TInstanceMethods = {},
  TQueryHelpers = {},
> extends Schema {
  private _registeredPostHooks: Record<string, (DocType) => void> = {};
  private _registeredPreHooks: Record<string, (DocType) => void> = {};

  private _subscribableEvents = [
    'count',
    'countDocuments',
    'deleteMany',
    'deleteOne',
    'estimatedDocumentCount',
    'find',
    'findOne',
    'findOneAndDelete',
    'findOneAndRemove',
    'findOneAndReplace',
    'findOneAndUpdate',
    'insertMany',
    'insertOne',
    'remove',
    'replaceOne',
    'update',
    'updateOne',
    'updateMany',
    'validate',
    'save',
    'remove',
    'updateOne',
    'deleteOne',
    'init',
  ];

  constructor(
    definition?: SchemaDefinition<SchemaDefinitionType<DocType>>,
    options?: SchemaOptions,
  ) {
    super(definition, options);
  }

  setPostHook(method: PostHookMethod, cb: (DocType) => void) {
    this._registeredPostHooks[method] = cb;
  }

  setPreHook(method: PostHookMethod, cb: (DocType) => void) {
    this._registeredPreHooks[method] = cb;
  }

  applySubscriptions() {
    const _self = this;
    for (const sEvent of this._subscribableEvents) {
      this.post(
        sEvent as any,
        async (res: any, next: CallbackWithoutResultAndOptionalError) => {
          if (_self._registeredPostHooks[sEvent]) {
            await _self._registeredPostHooks[sEvent](res);
          }
          if (next) {
            next();
          }
        },
      );
    }

    for (const sEvent of ['updateOne', 'findOneAndUpdate', 'save']) {
      this.pre(
        sEvent as any,
        { document: true, query: true },
        async function (next) {
          if (_self._registeredPreHooks[sEvent]) {
            await _self._registeredPreHooks[sEvent](this);
          }
          if (next) {
            try {
              next();
            } catch {}
          }
        },
      );
    }
  }
}
