
# creatorExperiences
Gets someones work history (experiences / games) from their talent hub profile.


## Parameters
| Name      | Type   | Description                                        |
| :-------- | :----- | :------------------------------------------------- |
| userId    | UserId | The id of the user to get verification info about. |
| sortOrder | ?      | The order the results are sorted it.               |
| limit     | ?      | The number of results to be returned               |
| cursor    | ?      | The paging cursor for the previous or next page.   |



## Example
```js copy showLineNumbers
const { data: experiences } = await ClassicTalentApi.creatorExperiences({ userId: 45348281 }); 
```

## Endpoint
```ansi
[38;5;156mGET[0m[2;33m[0m /v1/users/{userId}/experiences
```
  