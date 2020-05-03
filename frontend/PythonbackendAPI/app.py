from flask import Flask, jsonify, abort, request
import pandas as pd
from flask_cors import CORS, cross_origin

def load_data():
  csv_data = pd.read_csv("trade_data.csv", sep=',',encoding='latin-1')
  csv_data.set_index("CountryName")
  csv_data.sort_values(["CountryName"], axis=0,
                   ascending=True, inplace=True)
  return csv_data


app = Flask(__name__)
CORS(app)

cors = CORS(app, resources={
    r"/*": {
       "origins": "*"
    }
})

@app.route('/', methods=['GET'])
def display_data():
    data = load_data()
    return data.to_json(orient='records')


@app.route('/api/country/getCountries', methods=['GET'])
def get_countrydata():
    data = load_data()
    countryData = data.CountryName.unique()
    frameCountry = pd.DataFrame(countryData)
    #frameCountry = frameCountry.sort_values(by=['CountryName'])
    return frameCountry.to_json(orient='records')

@app.route('/api/type/getProductType', methods=['GET'])
def get_productType():
    data = load_data()
    productTypes = data.Product.unique()
    frameType = pd.DataFrame(productTypes)
    #frameType = frameType.sort_values(by=['Product'])
    return frameType.to_json(orient='records')

@app.route('/api/year/getYear', methods=['GET'])
def get_year():
    data = load_data()
    yearRange = data.Year.unique()
    yearData = pd.DataFrame(yearRange)
    #yearData = yearData.sort_values(by=['0'])
    return yearData.to_json(orient='records')

@app.route('/api/country/getCountries/<string:countryName>', methods=['GET'])
def get_productData(countryName):
    data = load_data()
    countryData = data[(data['CountryName'] == countryName)]
    return countryData.to_json(orient='records')

@app.route('/api/type/getProductType/<string:productType>', methods=['GET'])
def get_byType(productType):
    data = load_data()
    dataByType = data[(data['Product'] == productType)]
    return dataByType.to_json(orient='records')

@app.route('/api/yearCompare', methods=['GET'])
def get_yearData():
    data = load_data()
    from_year = request.args.get('from')
    to_year = request.args.get('to')
    countryName = request.args.get('country')
    productType = request.args.get('type')
    rangeData = data[(data['Year'].between(int(from_year), int(to_year), inclusive=True)) &
    (data['CountryName'] == countryName) & (data['Product'] == productType)]
    groupingSum = (rangeData.groupby(['CountryName', 'Year', 'Product'], as_index=False)).sum()
    return groupingSum.to_json(orient='records')
    # to_json(orient='records')


@app.route('/api/typeCompare', methods=['GET'])
def get_typeCompareData():
    data = load_data()
    from_year = request.args.get('from')
    to_year = request.args.get('to')
    countryName = request.args.get('country')
    rangeData = data[(data['Year'].between(int(from_year), int(to_year), inclusive=True)) &
    (data['CountryName'] == countryName)]
    # & (data['disasterType'] == disasterType)
    groupingSum = (rangeData.groupby(['Product'], as_index=False))['Value'].sum()
    groupingSum = groupingSum.sort_values('Value',ascending = False).head(20)
    # grouping = rangeData.groupby(['disasterType', 'year'], as_index=False)
    # print(groupingSum.apply(lambda x: x.to_json(orient='records')))
    return groupingSum.to_json(orient='records')
    # to_json(orient='records')


@app.route('/api/countryCompare', methods=['GET'])
def get_countryCompareData():
    data = load_data()
    from_year = request.args.get('from')
    to_year = request.args.get('to')
    productType = request.args.get('type')
    rangeData = data[(data['Year'].between(int(from_year), int(to_year), inclusive=True)) &
                     (data['Product'] == productType)]
    # & (data['disasterType'] == disasterType)
    groupingSum = (rangeData.groupby(['CountryName'], as_index=False))['Value'].sum()
    groupingSum = groupingSum.sort_values('Value',ascending = False).head(20)
    # grouping = rangeData.groupby(['disasterType', 'year'], as_index=False)
    # print(groupingSum.apply(lambda x: x.to_json(orient='records')))
    return groupingSum.to_json(orient='records')
    # to_json(orient='records')

@app.route('/api/countryMap', methods=['GET'])
def get_countryMap():
    data = load_data()
    # disasterType = request.args.get('type')
    # rangeData = data[(data['disasterType'] == disasterType)]
    # & (data['disasterType'] == disasterType)
    groupingSum = (data.groupby(['Product', 'CountryName'], as_index=False)).sum()
    # grouping = rangeData.groupby(['disasterType', 'year'], as_index=False)
    # print(groupingSum.apply(lambda x: x.to_json(orient='records')))
    return groupingSum.to_json(orient='records')
    # to_json(orient='records')

@app.route('/api/getEmissionData', methods=['GET'])
def get_EmissionData():
    data = loadEmissionData()
    from_year = request.args.get('from')
    to_year = request.args.get('to')
    countryName = request.args.get('countryName')
    rangeData = data[(data['Year'].between(int(from_year), int(to_year), inclusive=True)) & (data['CountryName'] == countryName)]
    groupingSum = (rangeData.groupby(['Year', 'CountryName'], as_index=False)).sum()
    return groupingSum.to_json(orient='records')

# Emperical View
@app.route('/api/getReportedEvents', methods=['GET'])
def get_ReportedEventData():
    data = load_data()
    # rangeData = data[(data['year'].between(2000, 2018, inclusive=True))]
    groupingSum = (data.groupby(['Year'], as_index=False)).sum()
    frameType = pd.DataFrame(groupingSum)
    return frameType.to_json(orient='records')

@app.route('/api/totalDeath', methods=['GET'])
def get_totalDeath():
    data = load_data()
    from_year = request.args.get('from')
    to_year = request.args.get('to')
    rangeData = data[(data['Year'].between(int(from_year), int(to_year), inclusive=True))]
    # & (data['disasterType'] == disasterType)
    groupingSum = (rangeData.groupby(['Year', 'Product'], as_index=False)).sum()
    # grouping = rangeData.groupby(['disasterType', 'year'], as_index=False)
    # print(groupingSum.apply(lambda x: x.to_json(orient='records')))
    return groupingSum.to_json(orient='records')
    # to_json(orient='records')

@app.route('/api/tenDeadliest', methods=['GET'])
def get_tenDeadliestEvent():
    data = load_data()
    data.sort_values(["Value"], axis=0,
                   ascending=False, inplace=True)
    frameType = pd.DataFrame(data)
    return frameType.to_json(orient='records')

@app.route('/api/deadliestEvent', methods=['GET'])
def get_deadliestEvent():
    data = load_data()
    groupingSum = (data.groupby(['Product'], as_index=False)).sum()
    groupingSum.sort_values(["Value"], axis=0,
                     ascending=False, inplace=True)
    frameType = pd.DataFrame(groupingSum)
    return frameType.to_json(orient='records')


@app.route('/api/topCountries', methods=['GET'])
def get_topCountries():
    data = load_data()
    groupingSum = (data.groupby(['CountryName'], as_index=False)).sum()
    groupingSum.sort_values(["Value"], axis=0,
                     ascending=False, inplace=True)
    frameType = pd.DataFrame(groupingSum)
    return frameType.to_json(orient='records')


if __name__ == '__main__':
    app.run(debug=True)

