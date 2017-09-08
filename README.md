# Broadsign APIs

### Setup
```
git clone ...(this repo)
cd broadsign/
npm install
```
See #Test for instructions on how to setup `newman` using `postman` to automate and mock a broadsign player.

API descriptions
---

### [Realtime POP](https://broadsign.com/docs/12-0-0/add-ons/real-time-pop-api/)

> BroadSign generates the proof of play as a **JSON document** via **HTTP/HTTP POST**. The encoding is **UTF-8**; the HTTP headers are **Content-Type: application/json.**

#### Parameters
By default, PoP logs are sent from the player at the end of each content's playback-- However, the player can also be configured to periodically send PoP logs periodically, meaning each POST request sent by the player can contain multiple PoP logs queued up since the last request.


**Invariant Parameters** : Unique per request

|        key        | value type |                                 desc                                 |
|:-----------------:|:----------:|:--------------------------------------------------------------------:|
|     `api_key`     |   string   | Custom API key sent from player. *Can be configured by the user.*    |
|    `player_id`    |   uint_64  | ID# of the specific device (player) that played the content          |

**Variant Parameters** : Could contain multiple per request

|      key          | value type |                                desc                                  |
|:-----------------:|:----------:|:--------------------------------------------------------------------:|
| `display_unit_id` |   uint_64  | ID# of the screen in which playback occured                          |
|     `frame_id`    |   uint_64  | ID# of the frame within the screen that played the content           |
|    `n_screens`    |   uint_32  | # of  active screens                                                 |
|    `ad_copy_id`   |   uint_64  | ID# of the specific content that played                              |
|   `campaign_id`   |   uint_64  | ID# of the campaign                                                  |
|   `schedule_id`   |   uint_64  | ID# of the schedule batch that queued this content                   |
|   `impressions`   |   uint_32  | **Interactive campaigns only**                                       |
|   `interactions`  |   uint_32  | **Interactive campaigns only**                                       |
|     `end_time`    |   string   | Timestamp (ISO 8601) representing end of playback                    |
|     `duration`    |   uint_32  | Duration of playback in ms                                           |
|       `ext1`      |   string   | Custom field used for another broadsign software (Broadsign Creator) |
|       `ext2`      |   string   | Custom field used for another broadsign software (Broadsign Creator) |

#### User configurable options
Found in `Configurations>Configuration_Profiles>{PROFILE_NAME}>Addons>POP` on the administrator
dashboard.

  * **Enable PoP** : By default, this is switched off.
  * **External URL** : Url that the player sends data to
  * **Report PoP every N:** Where N is a value in **seconds** (1 second - 65535 seconds) **Client applies a +/-10% randomization*
  * **Verbose Mode :**
    * `false` -> returns POP data in an array
    * `true` -> returns POP data in an object (dictionary)

#### Player Setup

Player setup is explained in the Broadsign docs : https://broadsign.com/docs/12-0-0/getting-started/

Players require a physical device and a free trial from broadsign. This step is somewhat optional because mock tests can be run using postman to simulate a player.

By default, PoP is disabled on Broadsign players, in order to enable it, the user must create a configuration profile with the appropriate properties.


## Test
`npm test`

**NOTE**  The test will NOT immediately work on your machine -- it will attempt to start a mock player session with a server and fail because itmight be pointing to the wrong IP_ADDRESS:PORT.

You must install `Postman` and import the collection `test/collections/broadsign.postman_collection.json` into the app and edit the url and port. Ideally, support for environment variables for those fields should be added.
